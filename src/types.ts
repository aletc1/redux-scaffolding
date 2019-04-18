import { Store, createStore as reduxCreateStore, AnyAction, Action } from 'redux';
import { getProperty, mergeBranch, asyncForEach } from './utils'
import { clone } from './utils';

export abstract class AsyncAction<TResult, TState> {
    abstract onStart: (...args: any[]) => Partial<TState>;
    abstract onSuccess: (result: TResult, ...args: any[]) => Partial<TState>;
    abstract onError: (error: any, ...args: any[]) => Partial<TState>;
}

export interface SagaAction {
    type: 'wait' | 'update' | 'dispatch',
    actionNames: string[],
    args: any,
}

export interface AugmentedAction extends Action<string> {
    payload: any
}

export class SagaControl {
    private _repository: ReduxRepository<any>;

    public constructor(repository: ReduxRepository<any>) {
        this._repository = repository;
    }

    public wait(...actionNames: string[]): SagaAction {
        return {
            actionNames: actionNames,
            args: undefined,
            type: 'wait'
        } as SagaAction;
    }
    public update(actionName: string, newState: any): SagaAction {
        return {
            actionNames: [actionName],
            args: newState,
            type: 'update'
        } as SagaAction;
    }
    public dispatch(actionName: string, ...args: any[]): SagaAction {
        return {
            actionNames: [actionName],
            args: args,
            type: 'dispatch'
        } as SagaAction;
    }
}

export abstract class ReduxRepository<TState> {
    private _store: ReduxStoreBuilder;
    private _dynamicReducers: ReducerDefinition[]
    private _state: TState;

    public get state(): TState { return this._state; }

    constructor(initialState: TState) {
        this._state = initialState;
        this._store = null as any;
        this._dynamicReducers = [] as ReducerDefinition[];
    }

    protected dispatchAsync<T>(actionName: string, promise: Promise<T>, ...args: any[]): Promise<T> {
        return new Promise((resolve, reject) => {
            this.dispatch(`${actionName}_STARTED`, args);
            promise
                .then(result => {
                    this.dispatch(`${actionName}_SUCCEEDED`, result, ...args)
                    resolve(result);
                })
                .catch(error => {
                    this.dispatch(`${actionName}_FAILED`, error, ...args);
                    reject(error);
                });
        });
    }

    protected dispatch(actionName: string, ...args: any[]): void {
        if (!this._store)
            throw new Error(`The repository '${this.constructor.name}' is not associated with any store`);
        var storeInfo = Reflect.getMetadata('__STORE', this);
        this._store.dispatch(`${storeInfo.namespace}/${actionName}`, ...args);
    }

    protected addReducer(actionName: string, reducer: (...args: any[]) => any, actionType: ActionType) {
        var storeInfo = Reflect.getMetadata('__STORE', this);

        var reducerDef = new ReducerDefinition(actionName, storeInfo.attachTo, this, reducer, actionType);

        if (this._store)
            throw new Error("Cannot add new reducer because the repository is mounted on a store.");
        else
            this._dynamicReducers.push(reducerDef);
    }
}

export type ActionType = 'Simple' | 'AsyncAction' | 'Saga'

export class ReducerDefinition {
    public actionName: string
    public actionType: ActionType
    public branch: string
    public reducer: (...args: any[]) => any
    public repository: ReduxRepository<any>

    public constructor(actionName: string, branch: string, repository: ReduxRepository<any>, reducer: (...args: any[]) => any, actionType: ActionType) {
        this.actionName = actionName;
        this.reducer = reducer;
        this.branch = branch;
        this.repository = repository;
        this.actionType = actionType;
    }
}

export interface RepositoryDefinition {
    attachTo: string,
    repository: ReduxRepository<any>
}

export class ReduxStoreBuilder {
    private _reducers: Map<string, ReducerDefinition>;
    private _store: Store;
    private _repositories: Map<string, RepositoryDefinition>;
    private _initialState: any;
    private _transientReducers: Map<string, ReducerDefinition[]>;

    get state(): any { return this._store.getState(); }

    constructor() {
        this._reducers = new Map<string, ReducerDefinition>();
        this._store = null as any;
        this._repositories = new Map<string, RepositoryDefinition>(); 
        this._initialState = {};
        this._transientReducers = new Map<string, ReducerDefinition[]>();
    }

    public getRootReducer(rootReducer?: (state: any, action: AnyAction) => any) {
        return (state: any, action: AnyAction) => {
            var reducerDefinition = this._reducers.get(action.type);
            var transientReducers = this._transientReducers.get(action.type);
            if (!reducerDefinition && !transientReducers && !rootReducer) {
                if (!rootReducer && (!action.type || (!action.type.startsWith("@@redux/") && !action.type.startsWith("@@INIT")))) {
                    console.log(`WARNING: Reducer for '${action.type}' not found`);
                }
                return rootReducer == null ? state : (rootReducer as any)(state, action);
            }

            if (reducerDefinition) {
                var partialState = reducerDefinition.reducer(action);
                (reducerDefinition.repository as any)._state = mergeBranch(state, reducerDefinition.branch, partialState);
            }
            if (transientReducers) {
                transientReducers.forEach(transientReducer => {
                    state = transientReducer.reducer(state, ...(action.payload || []));
                    (transientReducer.repository as any)._state = getProperty(state, transientReducer.branch);

                });
                this._transientReducers.delete(action.type);
            }

            return clone(rootReducer == null ? state : rootReducer(state, action));
        }
    }
    
    public getStore(state?: any, rootReducer?: (state: any, action: AnyAction) => any, createStore?: typeof reduxCreateStore) {
        createStore = createStore || reduxCreateStore;
        return this._store = createStore(this.getRootReducer(rootReducer), state || this._initialState) as any;
    }

    private addReducer(actionName: string, branch: string, target: ReduxRepository<any>, reducer: (...args: any[]) => any, actionType: ActionType) {
        this._reducers.set(actionName, new ReducerDefinition(actionName, branch, target, reducer, actionType));
    }

    public dispatch(actionName: string, ...args: any[]): void {
        if (!this._store)
            throw new Error("Redux store not initialized. Please call storeBuilder.getStore()");
        this._store.dispatch({
            type: actionName,
            payload: args
        });
    }

    private enhanceReducer(partialActionName: string, namespace: string, repository: ReduxRepository<any>, branch: string, reducerMethod: Function, actionType: string) {
        var actionName = `${namespace}/${partialActionName}`;

        switch (actionType) {
            case 'AsyncAction': {
                var actionMethods = reducerMethod() as AsyncAction<any, any>;
                if (actionMethods.onStart)
                    this.addReducer(`${actionName}_STARTED`, branch, repository, action => {
                        return actionMethods.onStart(...action.payload);
                    }, 'Simple');

                if (actionMethods.onSuccess)
                    this.addReducer(`${actionName}_SUCCEEDED`, branch, repository, (action: AugmentedAction) => {
                        return actionMethods.onSuccess(action.payload[0], ...(action.payload ? action.payload.slice(1) : undefined));
                    }, 'Simple');

                if (actionMethods.onError)
                    this.addReducer(`${actionName}_FAILED`, branch, repository, (action: AugmentedAction) => {
                        return actionMethods.onError(action.payload[0], ...(action.payload ? action.payload.slice(1) : undefined));
                    }, 'Simple');
                break;
            }
            case 'Saga':
                this.addReducer(actionName, branch, repository, async (action: AugmentedAction) => {
                    var iterator = reducerMethod.bind(repository)(new SagaControl(repository), ...action.payload);
                    return await this.processIterator(repository, actionName, branch, iterator);
                }, 'Saga');
                break;
            default:
                {
                    this.addReducer(actionName, branch, repository, (action: AugmentedAction) => {
                        return reducerMethod.bind(repository)(...action.payload);
                    }, 'Simple');
                    break;
                }
        }
    }

    private addTransientReducer(actionName: string, reducer: ReducerDefinition) {
        var reducers = this._transientReducers.get(actionName);
        if (reducers)
            reducers.push(reducer);
        else
            this._transientReducers.set(actionName, [reducer]);
    }

    private async processIterator(repository: ReduxRepository<any>, actionName: string, branch: string, iterator: Iterator<SagaAction>, args?: any): Promise<any> {
        let result: IteratorResult<SagaAction> = undefined as any;
        do {
            result = await iterator.next(args || (repository as any).state);
        } while (result && !result.value && !result.done);

        var reduxStore = (repository as any)._store as ReduxStoreBuilder;

        if (result == undefined || result.done)
            return (repository as any).state;

        await asyncForEach(result.value.actionNames, async (valueActionName) => {
            var nextActionName = valueActionName.startsWith("@@") ? valueActionName : `${actionName}_${valueActionName}`;
            switch (result.value.type) {
                case 'wait':
                    this.addTransientReducer(nextActionName, {
                        actionName: nextActionName,
                        actionType: 'Simple',
                        branch: branch,
                        repository: repository,
                        reducer: (state: any, args: any) => {
                            setTimeout(() => this.processIterator(repository, actionName, branch, iterator, { type: nextActionName, payload: args }));
                            return state;
                        }
                    });
                    break;
                case 'update':
                    this.addTransientReducer(nextActionName, {
                        actionName: nextActionName,
                        actionType: 'Simple',
                        branch: branch,
                        repository: repository,
                        reducer: (state: any, args: any) => {
                            mergeBranch(state, branch, args || {});
                            setTimeout(() => this.processIterator(repository, actionName, branch, iterator));
                            return state;
                        }
                    });
                    reduxStore.dispatch(nextActionName, ...result.value.args);
                    break;
                case 'dispatch':
                    reduxStore.dispatch(nextActionName, ...result.value.args);
                    return await this.processIterator(repository, actionName, branch, iterator);
            }
        });
        return (repository as any).state;
    }
    public addRepository(repository: ReduxRepository<any>) {
        var storeInfo = Reflect.getMetadata('__STORE', repository);
        if (storeInfo == null || !storeInfo.namespace || storeInfo.attachTo == '')
            throw new Error(`Attribute @repository is missing on repository '${typeof repository}'`)
        this._repositories.set(repository.constructor.name, { repository: repository, attachTo: storeInfo.attachTo });
        var repo = (repository as any);
        repo._store = this;
        if (repo._dynamicReducers) {
            repo._dynamicReducers.forEach((reducerDef: ReducerDefinition) => {
                this.enhanceReducer(reducerDef.actionName, storeInfo.namespace, repository, reducerDef.branch, reducerDef.reducer, reducerDef.actionType);
            });
        }
        mergeBranch(this._initialState, storeInfo.attachTo, (repository as any)._state);
        var branch = storeInfo.attachTo;
        Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).forEach(name => {
            let reducer = Reflect.getMetadata('__ACTION', repository, name);
            if (reducer && reducer.actionNames) {
                (reducer.actionNames as string[]).forEach(partialActionName => {
                    var reducerMethod = (repository as any)[name].bind(repository);
                    this.enhanceReducer(partialActionName, storeInfo.namespace, repository, branch, reducerMethod as any, reducer.actionType);
                });
            }
        });
    }
}

export const storeBuilder = new ReduxStoreBuilder();
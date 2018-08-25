import { createStore as reduxCreateStore, AnyAction, Action } from 'redux';
export declare abstract class AsyncAction<TResult, TState> {
    abstract onStart: (...args: any[]) => Partial<TState>;
    abstract onSuccess: (result: TResult, ...args: any[]) => Partial<TState>;
    abstract onError: (error: any, ...args: any[]) => Partial<TState>;
}
export interface SagaAction {
    type: 'wait' | 'update' | 'dispatch';
    actionNames: string[];
    args: any;
}
export interface AugmentedAction extends Action<string> {
    payload: any;
}
export declare class SagaControl {
    private _repository;
    constructor(repository: ReduxRepository<any>);
    wait(...actionNames: string[]): SagaAction;
    update(actionName: string, newState: any): SagaAction;
    dispatch(actionName: string, ...args: any[]): SagaAction;
}
export declare abstract class ReduxRepository<TState> {
    private _store;
    private _dynamicReducers;
    private _state;
    readonly state: TState;
    constructor(initialState: TState);
    protected dispatchAsync<T>(actionName: string, promise: Promise<T>, ...args: any[]): Promise<T>;
    protected dispatch(actionName: string, ...args: any[]): void;
    protected addReducer(actionName: string, reducer: (...args: any[]) => any, actionType: ActionType): void;
}
export declare type ActionType = 'Simple' | 'AsyncAction' | 'Saga';
export declare class ReducerDefinition {
    actionName: string;
    actionType: ActionType;
    branch: string;
    reducer: (...args: any[]) => any;
    repository: ReduxRepository<any>;
    constructor(actionName: string, branch: string, repository: ReduxRepository<any>, reducer: (...args: any[]) => any, actionType: ActionType);
}
export interface RepositoryDefinition {
    attachTo: string;
    repository: ReduxRepository<any>;
}
export declare class ReduxStoreBuilder {
    private _reducers;
    private _store;
    private _repositories;
    private _initialState;
    private _transientReducers;
    readonly state: any;
    constructor();
    getRootReducer(rootReducer?: (state: any, action: AnyAction) => any): (state: any, action: AnyAction) => any;
    getStore(state?: any, rootReducer?: (state: any, action: AnyAction) => any, createStore?: typeof reduxCreateStore): any;
    private addReducer;
    dispatch(actionName: string, ...args: any[]): void;
    private enhanceReducer;
    private addTransientReducer;
    private processIterator;
    addRepository(repository: ReduxRepository<any>): void;
}
export declare const storeBuilder: ReduxStoreBuilder;

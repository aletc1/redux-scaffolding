# redux-scaffolding

`redux-scaffolding` provides an easy way to use React Redux. It is not a replacement of redux but a scaffolding built over the existing redux library using some conventions.

> **Important for ES5**: You will need a Polyfill for [Function.name](https://www.npmjs.com/package/function.name) in order to make it work on Internet Explorer).

## Main goals
- Keep redux concepts and framework untouched
- Object oriented approach
- Declarative and strong typed definition using `typescript`
- Use ES6 generators and ES7/TypeScript decorators
- Expresive and traceable action names
- Enterprise-grade scaffolding to design large applications

### Why a new redux library?
Let's recall some redux concepts:
- **Store as a single source of truth**: In redux we have a single store that manages a big json object that represents 
 the full state of the application. This have multiple advantages like for instance, the continuation on the browser when
 server-side rendering is activated (some state is rederer server-side and then browser actions continues modifiying that 
 base state)
- **State is readonly**: State cannot be changed directly by the developer, instead, the developer dispatch *actions*
 that are queued in a central queue and are processed one by one in a strict order.
- **Changes are made by pure functions**: *Reducers* are just pure functions that take the previous state and an action, 
 and produces a new state. 

Wrapping up, Redux has **state**, **actions** and **reducers**. However, is very complex to use Redux alone, because all the
plumbing required to change a simple value in the state. Also, another drawback is that in complex/big applications, the sate
can be also very bing and hard to maintain, unless you split reducers and also split the state in smaller parts.

These known issues of current redux library encourages the birth of other libraries like [conventional-redux](https://github.com/mjaneczek/conventional-redux/), [redux-schemas](https://github.com/iamtommcc/redux-schemas),
 [redux-schemas](https://github.com/ddsol/redux-schema), [react-redux-oop](https://www.npmjs.com/package/react-redux-oop) and many others.
 
`redux-scaffolding` is inspired on these existing libraries, but has a different goal: to ease the plumbing required 
to build enterprise-grade applications using latest features of ES6/ES7 and TypeScript.

## Getting started

To install just use the following npm command:
```
npm install redux-scaffolding --save
```
It is very important that you enable experimental decorators and emit metadata in typescript `tsconfig.json`. Example:
```javascript
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "outDir": "lib",
    "moduleResolution": "node",
    "jsx": "react",
    "lib": [ "es6", "dom" ],
    "sourceMap": false,
    "inlineSourceMap": true,
    "declaration": true,
    "strict": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```
Finally, dont forget to include reflect metadata package on your bootstrap code:
```typescript
import 'reflect-metadata';
``` 

### Basic concepts

Let's start with a classic example: a counter. 

First of all, will define the form that will have the state.
```typescript
export interface CounterState {
    count: number
}
```
Since we are using TypeScript, the `SimpleState` interface will help us to model our state and 
will prevent typing errors when changing the sate in the reducer.

Then will add a **Repository**. This concept is introduced by `react-scaffolding` and is just
a way, using object-oriented programming, of handling specific *actions* and just update a secition
of the application state. This follows the *separation of concerns* principe: one repository one single responsability. 
 
```typescript
import { repository, reduce, ReduxRepository } from 'redux-scaffolding'

@repository("@@COUNTER", "counter")
export class CounterRepository extends ReduxRepository<CounterState> {
    public static readonly COUNT_INCREASED = "COUNT_INCREASED";

    constructor() {
        // Initial state
        super({ count: 0 });
    }

    public increase(amount?: number) {
        this.dispatch(CounterRepository.COUNT_INCREASED, amount || 2);
    }

    @reduce(CounterRepository.COUNT_INCREASED)
    protected onIncrease(amount: number): CounterState {
        return { ...this.state, count: this.state.count + amount };
    }
}
```
As you can see, the `@repository` decorator is used to define the *namespace* of the actions that this
 repository will handle (`@@COUNTER/*`) and the branch of the sate that will change, in this case `counter`.

All actions must be named with format `@@NAMESPACE/ACTION_NAME_[RESULT]`. The namespace will be used to
 correctly route the action to its specific repository. It is recommended to use past tense for naming actions.

`@reduce` decorator is used to link a reducer (class method) to a specific action. It is recommended to define
actions as class properties because will help automatic refactoring if the IDE supports it, and also can export
actions names to beign used in other components like sagas.

```typescript
import { connect } from 'redux-scaffolding'

type CounterComponentProps = {
    // Any component prop you want to define
};

@connect(["counter", CounterRepository])
class CounterComponent extends React.Component<CounterComponentProps, any> {
    private get counter() {
        return (this.props as any).counter as CounterRepository;
    }

    constructor(props: CounterComponentProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    private handleClick() {
        this.counter.increase(1);
    }
    render() {
        return <div>
            <button id="cmdIncrement" onClick={this.handleClick}>Increment</button>
            <span>{this.counter.state.count}</span>
        </div>;
    }
}
```

The decorator `connect` will automatically generate the `mapStateToProps` and `mapDispatchToProps` by convention.
You only need to specify the `storeBuilder`, the Repository class and the name of the property under props 
you want to use to connect the repository. Since repositories are singleton, this API
 will do the job.
To access the repository is recommended to create a readonly property called as specified in the connect decorator (in this case `get counter()`).  

Finally, the configureStore.ts content:
```typescript
import { storeBuilder } from 'redux-scaffolding'

// Global application state
export interface ApplicationState {
    counter: CounterState
}

export default function configureStore(initialState?: ApplicationState): Store<ApplicationState> {
    storeBuilder.addRepository(new CounterRepository());
    return storeBuilder.getStore(initialState);
}
```
### Async actions

Suppose you have a Promise, for instance, AJAX call to server. `redux-saffolding` has a convention
to easily handle async actions:

```typescript
public getData() {
    return this.dispatchAsync("GET_DATA", new Promise((resolve, reject) => {
        // Simulates server call
        setTimeout(() => resolve(["Hello", "World"]), 100);
    }));
}

@reduce("GET_DATA")
protected onGetData(): AsyncAction<string[], ListState> {
    return {
        onStart: (args) => ({ isBusy: true }),
        onSuccess: (result, args) => ({ isBusy: false, items: value }),
        onError: (error, args) => ({ isBusy: false, error: true })
    }
}
```
This example uses a `Promise` object, but you can use the new `async/await` syntax. The idea is that 
you use the `dispatchAsync` method, passing the promise as a parameter. `dispatchAsync` is also awaitable.

The async reducer has return type `AsyncAction<TResult, TState>`. `TResult` must match the promise result
type and `TState` the state. Each member, `onStart`, `onSuccess` and `onError` will trigger on each 
corresponding step of the promise.

One important convention is that on each step, a new action will be automatically dispatched, with `_START`, `_SUCCESS` 
or `_ERROR`. Following this example:
- *onStart* will dispatch `GET_DATA_START` with `{ isBusy: true}`.
- *onSuccess* will dispatch `GET_DATA_SUCCESS` with `{ isBusy: false, items: ["Hello", "World"]}`
- *onError* will dispatch `GET_DATA_ERROR` with `{ isBusy: false, error: true}`

### Sagas

Sagas in `redux-scaffolding` are very basic. If you need strong sagas, please use [redux-saga](https://github.com/redux-saga/redux-saga).

Sagas help to manage side effects (like loading data asynchronoulsy) but also can become a *Process Manager*
in big business transactions or workflows.

#### Simple saga
Since the introduction of JavaScript *Generators*, sagas become more clean to write and understand.
Also, are more testable because you can control step-by-step each iteration of the generator.

Let's model the previous *AsyncAction* (`getData`) using a saga.

```typescript
public getData() {
    return this.dispatch("GET_DATA");
}

@saga("GET_DATA")
private async *onGetData(control: SagaControl, ...args: any[]) {
    const { wait, update, dispatch } = control;
    let state: any = yield;

    yield update("START", { ...state, isBusy: true } as ListState);
    try {
        // Simulates server call
        var values = await new Promise((resolve, reject)=>{
            resolve(["Hello", "World"])
        });
        yield update("SUCCESS", { ...state, items: values, } as ListState);
    } catch {
        yield update("ERROR", { ...state, error: true } as ListState);
    }
    finally {
        yield update("DONE", { ...state, isBusy: false } as ListState);
    }
}        
```
As you can see, there are contol functions (`wait`, `update`, `dispatch`) that either wait for other actions, 
change the current state or dispatch new actions. By convention the `@@NAMESPACE` and the action name (`GET_DATA`)
will be prepended, forming, for instance `@@NAMESPACE/GET_DATA_START` global action.

Sagas have more freedom and can dispatch global actions or wait for actions dispatched from other repositories. 
Just use the full notation like will be shown on the next example.

#### Complex saga

Suppose that you already have some repositories to make a reservation of an hotel or a flight. However,
to book a vacation, you need to book a hotel and a flight, hence two reservation codes. If some reservation
fail then the other must be also cancelled.

```typescript
@repository("@@COMPLEX_SAGA", "complexSaga")
export class ComplexSagaRepoDemo extends ReduxRepository<ComplexSaga> {
    constructor() {
        super({ isBusy: false, hotelBookingCode: "", flightBookingCode: "", succeed: false });
    }

    public bookVacation(clientId: number) {
        return this.dispatch("BOOK_VACATION", clientId);
    }
    
    @saga("BOOK_VACATION")
    private async *onBookingStart(control: SagaControl, clientId: number) {
        const { wait, update, dispatch } = control;
        let state: ComplexSaga = yield update("BUSY", { isBusy: true });

        // Dispatch hotel reservation to another repository
        yield dispatch("@@RESERVATION/BOOK_HOTEL", clientId, "Hotel info");

        // Wait response from hotel reservation repository
        let result = yield wait("@@RESERVATION/BOOK_HOTEL_SUCCESS", "@@RESERVATION/BOOK_HOTEL_FAILED");
        switch (result.type) {
            case '@@RESERVATION/BOOK_HOTEL_SUCCESS':
                // If hotel reservation succeed, then update reservation code in state 
                state = yield update("HOTEL_SUCCESS", { hotelBookingCode: result.payload.bookingCode } as ComplexSaga)
                break;
            case "@@RESERVATION/BOOK_HOTEL_FAILED":
                // If hotel reservation fails, then set isBusy=false and break the workflow
                yield update("HOTEL_FAILED", { })
                yield update("BUSY", { isBusy: false } as ComplexSaga);
                return;
        }

        // Dispatch flight reservation (Hotel is already booked)
        yield dispatch("@@RESERVATION/BOOK_FLIGHT", clientId, "Flight info");
        result = yield wait("@@RESERVATION/BOOK_FLIGHT_SUCCESS", "@@RESERVATION/BOOK_FLIGHT_FAILED")
        switch (result.type) {
            case '@@RESERVATION/BOOK_FLIGHT_SUCCESS':
                // If flight reservation succeed, then update reservation code in state 
                state = yield update("FLIGHT_SUCCESS", { succeed: true, flightBookingCode: result.payload.bookingCode } as ComplexSaga)
                break;
            case "@@RESERVATION/BOOK_FLIGHT_FAILED":
                // If hotel reservation fails, then set isBusy=false and cancel current hotel reservation
                yield dispatch("@@RESERVATION/CANCEL_HOTEL", state.hotelBookingCode);
                yield update("FLIGHT_FAILED", { hotelBookingCode: '' })
                yield update("BUSY", { isBusy: false } as ComplexSaga);
                return;
        }

        // All reservations go well
        yield update("BUSY", { isBusy: false } as ComplexSaga);
    }
}
```
IMHO this is the full-power of a saga, not just model async operations. This (simplified) example resembles
a distributed business transactions between multiple repositories.


### Connect to multiple repositories

To connect to multiple repositories, you only need to pass connection information in `@connect` decorator:

```typescript
@connect(["repo1", FirstRepository], ["repo2", SecondRepository])
class MultiStoreComponent extends React.Component<any, any> {
    private get repo1() {
        return this.props.repo1 as FirstRepository;
    }

    private get repo2() {
        return this.props.repo2 as SecondRepository;
    }

    render() {
       ...
    }
}
```

### Dynamically create reducers
It is possible to dinamically add reducers to a repository, but only if the store is not connected.
This is usefull in inheritance scenarios when you want to create actions names from the base class using some data from 
the derived class.

```typescript
@repository("@@DYNAMIC", "dynamic")
export class DynamicRepoDemo extends ReduxRepository<CounterState> {
    constructor() {
        super({ count: 0 });

        this.addReducer("DYNAMIC_ACTION", (inc: number): CounterState => {
            return { ...this.state, count: this.state.count + inc };
        }, 'Simple')
    }

    public action() {
        this.dispatch("DYNAMIC_ACTION", 1);
    }
}
```

### Advanced configureStore
Suppose that you want to integrate the current `redux-scaffolding` in an existing redux application with an
existing configureStore method. The only thing you need to do is pass your custom createStore and your root reducer to `storeBuilder.getStore(...)`

```typescript
import { createStore, applyMiddleware, compose, combineReducers, StoreEnhancer, Store, StoreEnhancerStoreCreator, ReducersMapObject } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as StoreModule from './stores/store';
import { ApplicationState, reducers } from './stores/store';
import { History } from 'history';
import { storeBuilder } from 'redux-scaffolding';

export default function configureStore(history: History, initialState?: ApplicationState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;

    // If devTools is installed, connect to it
    const devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ as () => StoreEnhancer;
    const createStoreWithMiddleware = compose(
        applyMiddleware(thunk, routerMiddleware(history)),
        devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const rootReducer = buildRootReducer(reducers);
    const store = storeBuilder.getStore(initialState, rootReducer, createStoreWithMiddleware as any);

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./stores/store', () => {
            const nextRootReducer = require<typeof StoreModule>('./stores/store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }

    return store;
}

function buildRootReducer(allReducers: ReducersMapObject) {
    return combineReducers<ApplicationState>({ ...allReducers as any, router: routerReducer });
}
```
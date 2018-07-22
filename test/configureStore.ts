import { createStore, combineReducers, Store } from 'redux';
import { CounterRepository } from './tests/repositories/counter-repository';
import { storeBuilder } from '../src/index';
import { CounterState } from './tests/states/counter-state';

export interface ApplicationState {
    counter: CounterState
}

export default function configureStore(initialState?: ApplicationState): Store<ApplicationState> {
    storeBuilder.addRepository(new CounterRepository());
    return storeBuilder.getStore(initialState);
}

//const reducers = combineReducers<any>(store.reducers as any);
//return createStore(reducers, initialState || {});
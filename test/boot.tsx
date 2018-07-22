import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { mount, ReactWrapper } from 'enzyme';
import App from './app';
import configureStore from './configureStore';
import { ApplicationState } from './configureStore';

export default function renderAppWithState(state: ApplicationState): (Store<ApplicationState> | ReactWrapper<any>)[] {
    const store = configureStore(state);
    const wrapper = mount(
        <Provider store={ store } >
            <App />
        </Provider>
    );
    return [store, wrapper];
}
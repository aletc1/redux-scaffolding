import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import { reduce, repository } from '../../src/attributes'
import { ReduxStoreBuilder, ReduxRepository, AsyncAction } from '../../src/types';
import { SagaRepoDemo } from './repositories/saga-repository'
import { ComplexSagaRepoDemo } from './repositories/complex-saga-repository'

describe('Saga', () => {
    it('simple saga works', (done) => {
        var store = new ReduxStoreBuilder();
        var repository = new SagaRepoDemo();
        store.addRepository(repository);
        var reduxStore = store.getStore();

        repository.start();

        setTimeout(() => {
            debugger;
            expect(store.state.simpleSaga.started).to.eq(true);
            expect(store.state.simpleSaga.isBusy).to.eq(false);
            expect(store.state.simpleSaga.success).to.eq(true);
            expect(store.state.simpleSaga.failed).to.eq(false);
            done();
        }, 300);
    });

    it('complex saga works', (done) => {
        var store = new ReduxStoreBuilder();
        var repository = new ComplexSagaRepoDemo();
        store.addRepository(repository);

        var reduxStore = store.getStore();

        let clientId = 123456;

        repository.bookVacation(clientId);

        setTimeout(() => reduxStore.dispatch({ type: "@@RESERVATION/BOOK_HOTEL_SUCCEEDED", payload: { bookingCode: `H${clientId}` } }), 100);

        setTimeout(() => reduxStore.dispatch({ type: "@@RESERVATION/BOOK_FLIGHT_SUCCEEDED", payload: { bookingCode: `F${clientId}` }}), 200);

        setTimeout(() => {
            debugger;
            expect(store.state.complexSaga.isBusy).to.eq(false);
            expect(store.state.complexSaga.succeed).to.eq(true);
            expect(store.state.complexSaga.hotelBookingCode).to.eq(`H${clientId}`);
            expect(store.state.complexSaga.flightBookingCode).to.eq(`F${clientId}`);
            done();
        }, 300);
    });

    it('complex saga do rollback on failed', (done) => {
        var store = new ReduxStoreBuilder();
        var repository = new ComplexSagaRepoDemo();
        store.addRepository(repository);

        var reduxStore = store.getStore();

        let clientId = 123456;

        repository.bookVacation(clientId);

        setTimeout(() => reduxStore.dispatch({ type: "@@RESERVATION/BOOK_HOTEL_SUCCEEDED", payload: { bookingCode: `H${clientId}` } }), 100);

        setTimeout(() => reduxStore.dispatch({ type: "@@RESERVATION/BOOK_FLIGHT_FAILED", payload: { bookingCode: `F${clientId}` } }), 200);

        setTimeout(() => {
            debugger;
            expect(store.state.complexSaga.isBusy).to.eq(false);
            expect(store.state.complexSaga.succeed).to.eq(false);
            expect(store.state.complexSaga.hotelBookingCode).to.eq("");
            expect(store.state.complexSaga.flightBookingCode).to.eq("");
            done();
        }, 300);
    });
});
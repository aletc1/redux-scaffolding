import { reduce, repository, saga } from '../../../src/attributes'
import { ReduxRepository, SagaControl, SagaAction, AsyncAction } from '../../../src/types'

function dummyServerCall(): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(resolve, 10));
}

export interface ComplexSaga {
    isBusy: boolean,
    hotelBookingCode: string,
    flightBookingCode: string,
    succeed: boolean,
}

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
        let result = yield wait("@@RESERVATION/BOOK_HOTEL_SUCCEEDED", "@@RESERVATION/BOOK_HOTEL_FAILED");
        switch (result.type) {
            case '@@RESERVATION/BOOK_HOTEL_SUCCEEDED':
                // If hotel reservation succeed, then update reservation code in state 
                state = yield update("HOTEL_SUCCEEDED", { hotelBookingCode: result.payload.bookingCode } as ComplexSaga)
                break;
            case "@@RESERVATION/BOOK_HOTEL_FAILED":
                // If hotel reservation fails, then set isBusy=false and break the workflow
                yield update("HOTEL_FAILED", { })
                yield update("BUSY", { isBusy: false } as ComplexSaga);
                return;
        }
        // Dispatch flight reservation (Hotel is already booked)
        yield dispatch("@@RESERVATION/BOOK_FLIGHT", clientId, "Flight info");
        result = yield wait("@@RESERVATION/BOOK_FLIGHT_SUCCEEDED", "@@RESERVATION/BOOK_FLIGHT_FAILED")
        switch (result.type) {
            case '@@RESERVATION/BOOK_FLIGHT_SUCCEEDED':
                // If flight reservation succeed, then update reservation code in state 
                state = yield update("FLIGHT_SUCCEEDED", { succeed: true, flightBookingCode: result.payload.bookingCode } as ComplexSaga)
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
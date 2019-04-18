import { reduce, repository, saga } from '../../../src/attributes'
import { ReduxRepository, SagaControl, SagaAction } from '../../../src/types'

function dummyServerCall(): Promise < void> {
    return new Promise((resolve, reject) => setTimeout(resolve, 10));
}

export interface SimpleSaga {
    isBusy: boolean,
    started: boolean,
    success: boolean,
    failed: boolean,
}

@repository("@@SIMPLE_SAGA", "simpleSaga")
export class SagaRepoDemo extends ReduxRepository<SimpleSaga> {
    constructor() {
        super({ isBusy: false, started: false, success: false, failed: false });
    }

    public start() {
        debugger;
        return this.dispatch("SIMPLE_SAGA");
    }

    @saga("SIMPLE_SAGA")
    private async *onSagaStart(control: SagaControl, ...args: any[]) {
        debugger;
        const { wait, update, dispatch } = control;
        let state: any = yield;

        yield update("BUSY", { ...state, isBusy: true, started: true } as SimpleSaga);
        try {
            await dummyServerCall();
            yield update("SUCCEEDED", { ...state, success: true, } as SimpleSaga);
        } catch {
            yield update("FAILED", { ...state, failed: true } as SimpleSaga);
        }
        finally {
            yield update("BUSY", { ...state, isBusy: false } as SimpleSaga);
        }
    }        
}
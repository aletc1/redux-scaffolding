import { reduce, repository } from '../../../src/attributes'
import { ReduxRepository, AsyncAction } from '../../../src/types'
import { ComplexState } from '../states/complex-state'

@repository("@@COMPLEX", "complex")
export class ComplexRepoDemo extends ReduxRepository<ComplexState> {
    constructor() {
        super({ error: false, counter: 0 });
    }

    public complex() {
        return this.dispatchAsync("COMPLEX_ACTION", new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 10);
        }));
    }

    public complexWithArgs(a: number, b: number) {
        return this.dispatchAsync("COMPLEX_ACTION_WITH_ARGS", new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 10);
        }), a, b);
    }

    public complexError() {
        return this.dispatchAsync("COMPLEX_ACTION", new Promise((resolve, reject) => {
            setTimeout(() => reject(), 10);
        }));
    }

    @reduce("COMPLEX_ACTION")
    protected onComplex(): AsyncAction<{}, ComplexState> {
        return {
            onStart: () => ({}),
            onSuccess: (value) => {
                return { counter: this.state.counter + 1 }
            },
            onError: (error) => ({ error: true })
        }
    }

    @reduce("COMPLEX_ACTION_WITH_ARGS")
    protected onComplexWithArgs(): AsyncAction<{}, ComplexState> {
        return {
            onStart: (args) => ({}),
            onSuccess: (result, a, b) => {
                return { counter: this.state.counter + a + b }
            },
            onError: (error, args) => ({ error: true })
        }
    }
}
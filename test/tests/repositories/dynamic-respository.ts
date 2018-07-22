import { reduce, repository } from '../../../src/attributes'
import { ReduxRepository } from '../../../src/types'
import { CounterState } from '../states/counter-state'

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
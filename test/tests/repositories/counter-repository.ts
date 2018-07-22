import { reduce, repository } from '../../../src/attributes'
import { ReduxRepository } from '../../../src/types'
import { CounterState } from '../states/counter-state'

@repository("@@COUNTER", "counter")
export class CounterRepository extends ReduxRepository<CounterState> {
    public static readonly COUNT_INCREASED = "COUNT_INCREASED";

    constructor() {
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
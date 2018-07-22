import { repository, reduce, saga, AsyncAction, SagaControl, SagaAction, ReduxRepository } from '../../src/index';

export interface AccountState {
    isBusy: boolean,
    balance: number,
    ledger: number[]
}

@repository("@ACCOUNT", "account")
export default class AccountRepository extends ReduxRepository<AccountState> {
    static readonly ACCOUNT_DEPOSIT = "ACCOUNT_DEPOSIT";
    static readonly ACCOUNT_WITHDRAW = "ACCOUNT_WITHDRAW";
    
    public constructor() {
        super({
            isBusy: false,
            balance: 0,
            ledger: [],
        });
    }

    public incrementCounter(value: number) {
        return this.dispatchAsync<number>(AccountRepository.ACCOUNT_DEPOSIT, new Promise((resolve, reject) => {
            setTimeout(resolve(value), 500);
        }));
    }

    public decrementCounter(value: number) {
        return this.dispatch(AccountRepository.ACCOUNT_WITHDRAW, value);
    }

    @reduce(AccountRepository.ACCOUNT_DEPOSIT)
    private onIncrementCounter(): AsyncAction<number, AccountState> {
        return {
            onStart: () => ({ isBusy: true }),
            onSuccess: (value) => ({ counter: this.state.balance + value, isBusy: false, ledger: [...this.state.ledger, value] }),
            onError: (error) => ({ isBusy: false, })
        }
    }

    @reduce(AccountRepository.ACCOUNT_WITHDRAW)
    private onDecrement(value: number): Partial<AccountState> {
        return { balance: this.state.balance - value, ledger: [...this.state.ledger, -value] }
    }
}
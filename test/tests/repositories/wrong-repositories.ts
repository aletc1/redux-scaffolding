import { reduce, repository, connect } from '../../../src/attributes'
import { ReduxStoreBuilder, ReduxRepository, AsyncAction } from '../../../src/types';

export class RepoWithoutAttribute extends ReduxRepository<any> {
    @reduce("DUMMY_ACTION")
    protected onDummy(): any {
        return { ...this.state, counter: this.state.counter + 1 };
    }
}

@repository("@@EMPTY", "empty")
export class EmptyRepoDemo extends ReduxRepository<any> {
    protected onDummy(): any {
        return { ...this.state, counter: this.state.counter + 1 };
    }
}
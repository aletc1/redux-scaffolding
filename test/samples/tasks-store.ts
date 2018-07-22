import { repository, reduce, AsyncAction, ReduxRepository } from '../../src/index';

export interface Task {
    id: string,
    title: string
    categoryId: string
}

export interface TasksState {
    isBusy: boolean,
    items: Task[]
}

@repository("@@TASK", "tasks")
export default class AccountRepository extends ReduxRepository<TasksState> {
    static readonly TASK_ADDED = "TASK_ADDED";

    public constructor() {
        super({
            isBusy: false,
            items: [],
        });
    }

    public addTask(taskName: string, categoryId: string) {
        return this.dispatch(AccountRepository.TASK_ADDED, taskName, categoryId);
    }
    
    @reduce(AccountRepository.TASK_ADDED)
    private onAddTask(taskName: string, categoryId: string): Partial<TasksState> {
        return { ...this.state, items: [...this.state.items, { id: "", title: taskName, categoryId: categoryId }] }
    }
}
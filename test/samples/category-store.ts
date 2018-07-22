import { repository, reduce, AsyncAction, ReduxRepository } from '../../src/index';

export interface Category {
    id: string,
    title: string
}

export interface CategoriesState {
    isBusy: boolean,
    items: Category[]
}

export interface CategoryController {
    addCategory(categoryName: string): void;
}

@repository("@@CATEGORY", "categories")
export default class CategoryRepository
    extends ReduxRepository<CategoriesState>
    implements CategoryController {
    static readonly CATEGORY_ADDED = "CATEGORY_ADDED";
    
    public constructor() {
        super({
            isBusy: false,
            items: [],
        });
    }

    public addCategory(categoryName: string) {
        return this.dispatch(CategoryRepository.CATEGORY_ADDED, categoryName);
    }

    @reduce(CategoryRepository.CATEGORY_ADDED)
    private onAddCategory(categoryName: string): CategoriesState {
        return { ...this.state, items: [...this.state.items, { id: "", title: categoryName }]}
    }
}
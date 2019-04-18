import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import { reduce, repository, connect } from '../../src/attributes'
import { storeBuilder, ReduxStoreBuilder, ReduxRepository, AsyncAction } from '../../src/types';
import CategoryRepository from '../samples/category-store'
import { CounterRepository } from './repositories/counter-repository'
import { ComplexRepoDemo } from './repositories/complex-repository'
import { DynamicRepoDemo } from './repositories/dynamic-respository'
import { EmptyRepoDemo, RepoWithoutAttribute } from './repositories/wrong-repositories'
import { mergeBranch } from '../../src/utils';

describe('Attributes', () => {
    it('repository and reduce must create metadata', () => {
        function logParameters(target: any, key: string) {
            var types = Reflect.getMetadata("design:paramtypes", target, key) as any[];
            var s = types.map(a => a.name).join();
            console.log(`${key} param types: ${s}`);
        }

        var repository = new CounterRepository();

        var storeInfo = Reflect.getMetadata('__STORE', repository);
        var reducers = [] as any[];
        Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).forEach(name => {
            let reducer = Reflect.getMetadata('__ACTION', repository, name);
            if (reducer)
                reducers.push(reducer);
        });

        expect(storeInfo).not.null;
        expect(storeInfo.namespace).to.eq("@@COUNTER");
        expect(reducers.length).to.eq(1);
        expect(reducers[0].actionNames.length).to.eq(1)
        expect(reducers[0].actionNames[0]).to.eq("COUNT_INCREASED");
    });

    it('@repository namespace must start with @@', () => {
        expect(repository("NAMESPACE", "namespace")).to.throw();
    });

    it('@reduce action must not contain namespace information (cannot starts with @@)', () => {
        expect(reduce("@@NAMESPACE/action")).to.throw();
    });
});

describe('Types', () => {
    it('simple reducer must be added to the store correctly', () => {
        var storeBuilder = new ReduxStoreBuilder();
        var repository = new CounterRepository();
        storeBuilder.addRepository(repository);

        var reducers = (storeBuilder as any)._reducers as Map<string, any> 

        expect(reducers.size).to.eq(1);
        expect(reducers.keys().next().value).to.eq("@@COUNTER/COUNT_INCREASED");
        expect(reducers.values().next().value).not.null;
    });

    it('repo without @repository attribute should throw exception', () => {
        var storeBuilder = new ReduxStoreBuilder();
        var repository = new RepoWithoutAttribute({ counter: 0 });

        expect(storeBuilder.addRepository.bind(storeBuilder, repository)).to.throw()
    });
        
    it('repo without @reduce or @action attributes must not register reducers', () => {
        var storeBuilder = new ReduxStoreBuilder();
        var repository = new EmptyRepoDemo({ counter: 0 });

        var reducers = (storeBuilder as any)._reducers as Map<string, any> 
        storeBuilder.addRepository(repository);
        expect(reducers.size).to.eq(0);
    });
});
describe('Store', () => {
    it('mergeBranch works as expected', () => {
        var obj = { R0: "R0 Branch" } as any;
        mergeBranch(obj, "R1.child", { item: "value" });

        expect(obj.R1).to.not.eq(undefined);
        expect(obj.child).to.eq(undefined);
        expect(obj.R1.child).to.not.eq(undefined);
        expect(obj.R1.child.item).to.eq("value");
    });
});
describe('Store', () => {
    it('simple reducer works', () => {
        var repository = new CounterRepository();
        storeBuilder.addRepository(repository);        
        var reduxStore = storeBuilder.getStore();

        repository.increase();

        expect(storeBuilder.state.counter.count).to.eq(2);
    });

    it('complex reducer works', async () => {
        var repository = new ComplexRepoDemo();
        storeBuilder.addRepository(repository);
        var reduxStore = storeBuilder.getStore();

        await repository.complex();

        expect(storeBuilder.state.complex.counter).to.eq(1);
    });

    it('complex reducer with arguments works', async () => {
        var repository = new ComplexRepoDemo();
        storeBuilder.addRepository(repository);
        var reduxStore = storeBuilder.getStore();

        await repository.complexWithArgs(5, 3);

        expect(storeBuilder.state.complex.counter).to.eq(8);
    });

    it('AsynAction can manage reject (OnError)', async () => {
        var complexRepoDemo = new ComplexRepoDemo();
        storeBuilder.addRepository(complexRepoDemo);

        var reduxStore = storeBuilder.getStore();
        try {
            await complexRepoDemo.complexError();
        } catch {
            // throws error
        }

        expect(storeBuilder.state.complex.error).to.equal(true);
    });

    it('Dynamic reducers works', async () => {
        var dynamicRepoDemo = new DynamicRepoDemo();
        storeBuilder.addRepository(dynamicRepoDemo);

        storeBuilder.getStore();

        await dynamicRepoDemo.action();

        expect(storeBuilder.state.dynamic.count).to.equal(1);
    });

    it('Dispatch should throw exception on un-initialized redux stores', async () => {
        var counterRepository = new CounterRepository();
        storeBuilder.addRepository(counterRepository);

        // This is how redux store get initialized
        //storeBuilder.getStore();

        expect(counterRepository.increase).to.throw();
    });
});

describe('Tasks sample', () => {
    it('can add some categories', () => {
        var repository = new CategoryRepository();
        storeBuilder.addRepository(repository);
        var reduxStore = storeBuilder.getStore();

        repository.addCategory("Lorem");
        repository.addCategory("Ipsum");

        expect(storeBuilder.state.categories.items.length).to.eq(2);
        expect(storeBuilder.state.categories.items[0].title).to.eq("Lorem");
        expect(storeBuilder.state.categories.items[1].title).to.eq("Ipsum");
    });
});
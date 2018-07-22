import * as React from 'react';
import { expect } from 'chai';
import 'mocha';
import { Provider } from 'react-redux'
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { storeBuilder, ReduxRepository, AsyncAction } from '../../src/types';
import { connect, repository, reduce } from '../../src/attributes'
import { CounterRepository } from './repositories/counter-repository'
import { CounterState } from './states/counter-state'
import { ComplexRepoDemo } from './repositories/complex-repository'

configure({ adapter: new Adapter() });

@repository("@@SUBBRANCH", "sub.branch.counter")
export class SubbranchRepository extends ReduxRepository<CounterState> {
    public static readonly COUNT_INCREASED = "COUNT_INCREASED";

    constructor() {
        super({ count: 0 });
    }

    public increase(amount?: number) {
        this.dispatch(CounterRepository.COUNT_INCREASED, amount || 2);
    }

    @reduce(SubbranchRepository.COUNT_INCREASED)
    protected onIncrease(amount: number): CounterState {
        return { ...this.state, count: this.state.count + amount };
    }
}

describe('React connected component', () => {
    it('can connect component', () => {
        var counterRepository = new CounterRepository();
        storeBuilder.addRepository(counterRepository);

        @connect(["counter", CounterRepository])
        class CounterComponent extends React.Component<any, any> {
            private handleClick() {
                this.props.counter.increase();
            }
            render() {
                return <div>
                    <button onClick={this.handleClick}>Increment</button>
                    <span>{this.props.counter.state.count}</span>
                </div>;
            }
        }

        const wrapper = mount(<Provider store={storeBuilder.getStore()}><CounterComponent /></Provider>);
        expect(wrapper.find("span").text()).to.equal("0");
    });

    it('can connect component to sub-branch', () => {
        var subbranchRepository = new SubbranchRepository();
        storeBuilder.addRepository(subbranchRepository);

        @connect(["counter", SubbranchRepository])
        class CounterComponent extends React.Component<any, any> {
            private handleClick() {
                this.props.counter.increase();
            }
            render() {
                return <div>
                    <button onClick={this.handleClick}>Increment</button>
                    <span>{this.props.counter.state.count}</span>
                </div>;
            }
        }

        const wrapper = mount(<Provider store={storeBuilder.getStore()}><CounterComponent /></Provider>);
        expect(wrapper.find("span").text()).to.equal("0");
    });

    it('component chages state by redux action', () => {
        var simpleRepoDemo = new CounterRepository();
        storeBuilder.addRepository(simpleRepoDemo);
        var reduxStore = storeBuilder.getStore();

        @connect(["counter", CounterRepository])
        class DummyComponent extends React.Component<any, any> {
            render() {
                return <div>{this.props.counter.state.count}</div>
            }
        }

        simpleRepoDemo.increase();

        const wrapper = mount(<Provider store={reduxStore}><DummyComponent /></Provider>);
        expect(wrapper.find("div").text()).to.equal("2");
    });

    it('@connect to invalid repository should throw exception', () => {
        var reduxStore = storeBuilder.getStore();

        expect(connect(["counter", CounterRepository]).bind(
        class DummyComponent extends React.Component<any, any> {
            render() {
                return <div>{this.props.counter.state.count}</div>
            }
        })).to.throw()
    });

    it('connected component can dispatch repository actions', async () => {
        var counterRepository = new CounterRepository();
        storeBuilder.addRepository(counterRepository);
        var reduxStore = storeBuilder.getStore();

        type CounterComponentProps = {
            // Any component prop you want to define
        };

        @connect(["counter", CounterRepository])
        class CounterComponent extends React.Component<CounterComponentProps, any> {
            private get counter() {
                return (this.props as any).counter as CounterRepository;
            }

            constructor(props: CounterComponentProps) {
                super(props);
                this.handleClick = this.handleClick.bind(this);
            }

            private handleClick() {
                this.counter.increase(1);
            }
            render() {
                return <div>
                    <button id="cmdIncrement" onClick={this.handleClick}>Increment</button>
                    <span>{this.counter.state.count}</span>
                </div>;
            }
        }

        var reduxStore = storeBuilder.getStore();

        let wrapper = mount(<Provider store={reduxStore}><CounterComponent /></Provider>);
        wrapper.find("#cmdIncrement").simulate("click");
                
        expect(reduxStore.getState().counter.count).to.equal(1);
    });
});
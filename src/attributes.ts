import * as React from 'react';
import { storeBuilder, AsyncAction } from './types';
import "reflect-metadata";
import { connect as reduxConnect } from 'react-redux'
import { getProperty } from './utils'

export function repository(namespace: string, attachTo: string) {
    return <TFunction extends Function>(constructor: TFunction): TFunction => {
        if (!namespace.startsWith("@@"))
            throw new Error("Namespace should start with @@");
        Reflect.defineMetadata("__STORE", { namespace: namespace, attachTo: attachTo }, constructor.prototype);
        return constructor;
    }
}

export function reduce(...actionNames: string[]) {
    return function <T extends AsyncAction<any, any> | Partial<any>>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => T>) {
        actionNames.forEach(actionName => {
            if (actionName.startsWith("@"))
                throw new Error("Action name cannot contain namespace information inside a repository");
        })

        var type = Reflect.getMetadata("design:returntype", target, propertyKey);
        Reflect.defineMetadata("__ACTION", { actionNames: actionNames, actionType: type ? type.name : undefined }, target, propertyKey);
        return descriptor;
    }
}

export function saga(...actionNames: string[]) {
    return function <T extends AsyncAction<any, any> | Partial<any>>(target: any, propertyKey: string | symbol) {
        Reflect.defineMetadata("__ACTION", { actionNames: actionNames, actionType: 'Saga' }, target, propertyKey);
        return target;
    }
}

export function connect(...repositories: [string, Function][]): <TFunction extends Function>(constructor: TFunction) => TFunction {
    return reduxConnect((state) => {
        var newState = {} as any;
        repositories.forEach(repoInfo => {
            var repoDefinition = (storeBuilder as any)._repositories.get(repoInfo[1].name) as any;
            if (!repoDefinition)
                throw new Error(`Repository '${repoInfo[1].name}' not registered in the store. Use storeBuilder.addRepository(repo) to register the repository`);
            newState[repoInfo[0]] = { state: getProperty(state, repoDefinition.attachTo) };
        });
        return state;
    }, 
    () => {
        debugger;
        var props = {} as any;
        repositories.forEach(repoInfo => {
            var repositoryName = repoInfo[1].name;
            Object.defineProperty(props, repoInfo[0], {
                get: function () {
                    var repoDefinition = (storeBuilder as any)._repositories.get(repositoryName) as any;
                    if (!repoDefinition) {
                        throw new Error(`Repository '${repositoryName}' not registered in the store. Use storeBuilder.addRepository(repo) to register the repository`);
                    }
                    return repoDefinition.repository;
                },
                enumerable: true,
                configurable: true,
            });
        });
        return props;
    }, 
    null,
    { pure: false }) as any;
}
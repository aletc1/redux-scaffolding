import { AsyncAction } from './types';
import "reflect-metadata";
export declare function repository(namespace: string, attachTo: string): <TFunction extends Function>(constructor: TFunction) => TFunction;
export declare function reduce(...actionNames: string[]): <T extends AsyncAction<any, any> | Partial<any>>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => T>) => TypedPropertyDescriptor<(...args: any[]) => T>;
export declare function saga(...actionNames: string[]): <T extends AsyncAction<any, any> | Partial<any>>(target: any, propertyKey: string | symbol) => any;
export declare function connect(...repositories: [string, Function][]): <TFunction extends Function>(constructor: TFunction) => TFunction;

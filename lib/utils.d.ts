export declare function getProperty(object: any, propertyName: string): any;
export declare function mergeBranch(state: any, branch: string, partialState: any): any;
export declare function asyncForEach(array: any[], callback: (item: any, index: number, array: any[]) => Promise<any>): Promise<void>;
export declare const clone: <T>(object: any) => any;

export function getProperty(object: any, propertyName: string): any {
    var parts = propertyName.split("."),
        length = parts.length,
        i,
        property = object || {};

    for (i = 0; i < length; i++) {
        if (!property)
            return undefined;
        property = property[parts[i]];
    }

    return property;
}

export function mergeBranch(state: any, branch: string, partialState: any) {
    var parts = branch.split(".")
    var obj = state;
    for (var idx = 0; idx < parts.length - 1; idx++) {
        var o = obj[parts[idx]];
        if (o) {
            obj = o;
        } else {
            obj = obj[parts[idx]] = {}
        }
    }
    return obj[parts[idx]] = Object.assign(obj[parts[idx]] || {}, partialState);
}

export async function asyncForEach(array: any[], callback: (item: any, index: number, array: any[]) => Promise<any>) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

export const clone = <T>(object: any) => {
    if (typeof object === 'object')
        return Object.assign({}, object) as T;
    return object;
}

import { Knex } from "knex";
import { IfilterFind, IfilterGraphOps, IfilterPopulate, IfilterSummation } from "./interfaces";
export declare class Pipeline {
    dbconnection: Knex<any, any[]>;
    module: string;
    constructor(dbconnection: Knex, module: string);
    count(filterWith: Record<string, any>[] | Record<string, any>, table: string, filterWithout?: Record<string, any> | Record<string, any>[], timeFilters?: {
        key: string;
        fromTime: Date;
        toTime: Date;
    }): Promise<{
        count: {
            [k: string]: string | number;
        }[];
    }>;
    find(options: IfilterFind, needsPagination: boolean): Promise<{
        count: any[];
        result: any[];
    } | {
        result: any[];
        count?: undefined;
    }>;
    findOne(filterWith: Record<string, any>[] | Record<string, any>, table: string, col?: string[], filterWithout?: Record<string, any> | Record<string, any>[]): Promise<any>;
    insert(data: Record<string, any> | Record<string, any>[], table: string): Promise<{
        created_at: Date;
        updated_at: Date;
    } | {
        created_at: Date;
        updated_at: Date;
        length: number;
        toString(): string;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions): string;
        pop(): Record<string, any> | undefined;
        push(...items: Record<string, any>[]): number;
        concat(...items: ConcatArray<Record<string, any>>[]): Record<string, any>[];
        concat(...items: (Record<string, any> | ConcatArray<Record<string, any>>)[]): Record<string, any>[];
        join(separator?: string): string;
        reverse(): Record<string, any>[];
        shift(): Record<string, any> | undefined;
        slice(start?: number, end?: number): Record<string, any>[];
        sort(compareFn?: ((a: Record<string, any>, b: Record<string, any>) => number) | undefined): Record<string, any>[];
        splice(start: number, deleteCount?: number): Record<string, any>[];
        splice(start: number, deleteCount: number, ...items: Record<string, any>[]): Record<string, any>[];
        unshift(...items: Record<string, any>[]): number;
        indexOf(searchElement: Record<string, any>, fromIndex?: number): number;
        lastIndexOf(searchElement: Record<string, any>, fromIndex?: number): number;
        every<S extends Record<string, any>>(predicate: (value: Record<string, any>, index: number, array: Record<string, any>[]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: Record<string, any>, index: number, array: Record<string, any>[]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: Record<string, any>, index: number, array: Record<string, any>[]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: Record<string, any>, index: number, array: Record<string, any>[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: Record<string, any>, index: number, array: Record<string, any>[]) => U, thisArg?: any): U[];
        filter<S extends Record<string, any>>(predicate: (value: Record<string, any>, index: number, array: Record<string, any>[]) => value is S, thisArg?: any): S[];
        filter(predicate: (value: Record<string, any>, index: number, array: Record<string, any>[]) => unknown, thisArg?: any): Record<string, any>[];
        reduce(callbackfn: (previousValue: Record<string, any>, currentValue: Record<string, any>, currentIndex: number, array: Record<string, any>[]) => Record<string, any>): Record<string, any>;
        reduce(callbackfn: (previousValue: Record<string, any>, currentValue: Record<string, any>, currentIndex: number, array: Record<string, any>[]) => Record<string, any>, initialValue: Record<string, any>): Record<string, any>;
        reduce<U>(callbackfn: (previousValue: U, currentValue: Record<string, any>, currentIndex: number, array: Record<string, any>[]) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: Record<string, any>, currentValue: Record<string, any>, currentIndex: number, array: Record<string, any>[]) => Record<string, any>): Record<string, any>;
        reduceRight(callbackfn: (previousValue: Record<string, any>, currentValue: Record<string, any>, currentIndex: number, array: Record<string, any>[]) => Record<string, any>, initialValue: Record<string, any>): Record<string, any>;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: Record<string, any>, currentIndex: number, array: Record<string, any>[]) => U, initialValue: U): U;
        find<S extends Record<string, any>>(predicate: (value: Record<string, any>, index: number, obj: Record<string, any>[]) => value is S, thisArg?: any): S | undefined;
        find(predicate: (value: Record<string, any>, index: number, obj: Record<string, any>[]) => unknown, thisArg?: any): Record<string, any> | undefined;
        findIndex(predicate: (value: Record<string, any>, index: number, obj: Record<string, any>[]) => unknown, thisArg?: any): number;
        fill(value: Record<string, any>, start?: number, end?: number): Record<string, any>[];
        copyWithin(target: number, start: number, end?: number): Record<string, any>[];
        entries(): ArrayIterator<[number, Record<string, any>]>;
        keys(): ArrayIterator<number>;
        values(): ArrayIterator<Record<string, any>>;
        includes(searchElement: Record<string, any>, fromIndex?: number): boolean;
        flatMap<U, This = undefined>(callback: (this: This, value: Record<string, any>, index: number, array: Record<string, any>[]) => U | readonly U[], thisArg?: This | undefined): U[];
        flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
        at(index: number): Record<string, any> | undefined;
        findLast<S extends Record<string, any>>(predicate: (value: Record<string, any>, index: number, array: Record<string, any>[]) => value is S, thisArg?: any): S | undefined;
        findLast(predicate: (value: Record<string, any>, index: number, array: Record<string, any>[]) => unknown, thisArg?: any): Record<string, any> | undefined;
        findLastIndex(predicate: (value: Record<string, any>, index: number, array: Record<string, any>[]) => unknown, thisArg?: any): number;
        toReversed(): Record<string, any>[];
        toSorted(compareFn?: ((a: Record<string, any>, b: Record<string, any>) => number) | undefined): Record<string, any>[];
        toSpliced(start: number, deleteCount: number, ...items: Record<string, any>[]): Record<string, any>[];
        toSpliced(start: number, deleteCount?: number): Record<string, any>[];
        with(index: number, value: Record<string, any>): Record<string, any>[];
        [Symbol.iterator](): ArrayIterator<Record<string, any>>;
        [Symbol.unscopables]: {
            [x: number]: boolean | undefined;
            length?: boolean | undefined;
            toString?: boolean | undefined;
            toLocaleString?: boolean | undefined;
            pop?: boolean | undefined;
            push?: boolean | undefined;
            concat?: boolean | undefined;
            join?: boolean | undefined;
            reverse?: boolean | undefined;
            shift?: boolean | undefined;
            slice?: boolean | undefined;
            sort?: boolean | undefined;
            splice?: boolean | undefined;
            unshift?: boolean | undefined;
            indexOf?: boolean | undefined;
            lastIndexOf?: boolean | undefined;
            every?: boolean | undefined;
            some?: boolean | undefined;
            forEach?: boolean | undefined;
            map?: boolean | undefined;
            filter?: boolean | undefined;
            reduce?: boolean | undefined;
            reduceRight?: boolean | undefined;
            find?: boolean | undefined;
            findIndex?: boolean | undefined;
            fill?: boolean | undefined;
            copyWithin?: boolean | undefined;
            entries?: boolean | undefined;
            keys?: boolean | undefined;
            values?: boolean | undefined;
            includes?: boolean | undefined;
            flatMap?: boolean | undefined;
            flat?: boolean | undefined;
            at?: boolean | undefined;
            findLast?: boolean | undefined;
            findLastIndex?: boolean | undefined;
            toReversed?: boolean | undefined;
            toSorted?: boolean | undefined;
            toSpliced?: boolean | undefined;
            with?: boolean | undefined;
            [Symbol.iterator]?: boolean | undefined;
            readonly [Symbol.unscopables]?: boolean | undefined;
        };
    }>;
    populate(options: IfilterPopulate, needsPagination: boolean): Promise<{
        count: number;
        result: any[] | any[];
    } | {
        result: any[] | any[];
        count?: undefined;
    }>;
    update(data: Record<string, any> | Record<string, any>[], filterWith: Record<string, any>, table: string): Promise<{
        updateData: number;
        data: Record<string, any> | Record<string, any>[];
        updated_at: Date;
    }>;
    amountTimeGraphPlot(options: IfilterGraphOps): Promise<any>;
    deleleItem(filterWith: Record<string, any>[] | Record<string, any>, table: string, filterWithout?: Record<string, any> | Record<string, any>[]): Promise<number>;
    sum(options: IfilterSummation): Promise<{
        sum: number;
    }>;
}
//# sourceMappingURL=index.d.ts.map
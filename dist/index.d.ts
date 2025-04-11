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
        "count(*)": number;
    }[] | any>;
    find(options: IfilterFind, needsPagination: boolean): Promise<{
        count: any[];
        result: any[];
    } | {
        result: any[];
        count?: undefined;
    }>;
    findOne(filterWith: Record<string, any>[] | Record<string, any>, table: string, col?: string[], filterWithout?: Record<string, any> | Record<string, any>[]): Promise<Record<string, any>>;
    insert(data: Record<string, any> | Record<string, any>[], table: string): Promise<{
        created_at: Date;
        updated_at: Date;
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
    amountTimeGraphPlot(options: IfilterGraphOps): Promise<Array<Array<{
        x_axis: string;
        y_axis: number;
    }>>>;
    deleleItem(filterWith: Record<string, any>[] | Record<string, any>, table: string, filterWithout?: Record<string, any> | Record<string, any>[]): Promise<number>;
    sum(options: IfilterSummation): Promise<{
        sum: number;
    }>;
}
//# sourceMappingURL=index.d.ts.map
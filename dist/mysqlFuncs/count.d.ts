import { Knex } from "knex";
export declare const countItemsInDB: (dbconnection: Knex, filterWith: Record<string, any>[] | Record<string, any>, // can be an array for or values OR and for AND values
table: string, filterWithout?: Record<string, any> | Record<string, any>[], timeFilters?: {
    key: string;
    fromTime: Date;
    toTime: Date;
}) => Promise<{
    count: {
        [k: string]: string | number;
    }[];
}>;
//# sourceMappingURL=count.d.ts.map
import { Knex } from "knex";
import { IfilterPopulate } from "../interfaces";
export declare const findAndJoinTableFetch: (options: IfilterPopulate, needsPagination: boolean, dbconnection: Knex) => Promise<{
    count: number;
    result: any[] | any[];
} | {
    result: any[] | any[];
    count?: undefined;
}>;
//# sourceMappingURL=populate.d.ts.map
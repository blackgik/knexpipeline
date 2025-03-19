import { Knex } from "knex";
import { IfilterFind } from "./interfaces";
export declare const findAllIemsNoPopulate: (options: IfilterFind, dbconnection: Knex, needsPagination: boolean) => Promise<{
    count: any[];
    result: any[];
} | {
    result: any[];
    count?: undefined;
}>;
//# sourceMappingURL=find.d.ts.map
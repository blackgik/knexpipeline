import { Knex } from "knex";
import { IfilterSummation } from "src/interfaces";
export declare const amountSummation: (dbconnection: Knex, options: IfilterSummation) => Promise<{
    sum: number;
}>;
//# sourceMappingURL=summation.d.ts.map
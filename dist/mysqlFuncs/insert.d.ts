import { Knex } from "knex";
export declare const insertItemIntoDatabase: (data: Record<string, any> | Record<string, any>[], table: string, dbconnection: Knex) => Promise<{
    created_at: Date;
    updated_at: Date;
}>;
//# sourceMappingURL=insert.d.ts.map
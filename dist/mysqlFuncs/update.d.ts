import { Knex } from "knex";
export declare const updateItemSinDatabase: (data: Record<string, any> | Record<string, any>[], table: string, filterWith: Record<string, any>, dbconnections: Knex) => Promise<{
    updateData: number;
    data: Record<string, any> | Record<string, any>[];
    updated_at: Date;
}>;
//# sourceMappingURL=update.d.ts.map
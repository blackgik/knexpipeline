import { countItemsInDB } from "./count";
import { findAllIemsNoPopulate } from "./find";
import { findOneItem } from "./findOne";
import { insertItemIntoDatabase } from "./insert";
import { findAndJoinTableFetch } from "./populate";
import { updateItemSinDatabase } from "./update";
import { amountTimeGetGraphData } from "./graph";
import { deleteItemsFromList } from "./delete";
export class Pipeline {
    dbconnection;
    module;
    constructor(dbconnection, module) {
        this.dbconnection = dbconnection;
        this.module = module;
    }
    async count(filterWith, table, filterWithout) {
        // initiating count steps
        return await countItemsInDB(this.dbconnection, filterWith, table, filterWithout);
    }
    async find(options, needsPagination) {
        return await findAllIemsNoPopulate(options, this.dbconnection, needsPagination);
    }
    async findOne(filterWith, table, col, filterWithout) {
        col = col?.length ? col : [];
        return await findOneItem(filterWith, table, col, this.dbconnection, filterWithout);
    }
    async insert(data, table) {
        return await insertItemIntoDatabase(data, table, this.dbconnection);
    }
    async populate(options, needsPagination) {
        return await findAndJoinTableFetch(options, needsPagination, this.dbconnection);
    }
    async update(data, filterWith, table) {
        return await updateItemSinDatabase(data, table, filterWith, this.dbconnection);
    }
    async amountTimeGraphPlot(options) {
        return await amountTimeGetGraphData(options, this.dbconnection);
    }
    async deleleItem(filterWith, table, filterWithout) {
        return await deleteItemsFromList(filterWith, table, this.dbconnection, filterWithout);
    }
}

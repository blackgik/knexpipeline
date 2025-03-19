"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipeline = void 0;
const count_1 = require("./count");
const find_1 = require("./find");
const findOne_1 = require("./findOne");
const insert_1 = require("./insert");
const populate_1 = require("./populate");
const update_1 = require("./update");
const graph_1 = require("./graph");
const delete_1 = require("./delete");
class Pipeline {
    dbconnection;
    module;
    constructor(dbconnection, module) {
        this.dbconnection = dbconnection;
        this.module = module;
    }
    async count(filterWith, table, filterWithout) {
        // initiating count steps
        return await (0, count_1.countItemsInDB)(this.dbconnection, filterWith, table, filterWithout);
    }
    async find(options, needsPagination) {
        return await (0, find_1.findAllIemsNoPopulate)(options, this.dbconnection, needsPagination);
    }
    async findOne(filterWith, table, col, filterWithout) {
        col = col?.length ? col : [];
        return await (0, findOne_1.findOneItem)(filterWith, table, col, this.dbconnection, filterWithout);
    }
    async insert(data, table) {
        return await (0, insert_1.insertItemIntoDatabase)(data, table, this.dbconnection);
    }
    async populate(options, needsPagination) {
        return await (0, populate_1.findAndJoinTableFetch)(options, needsPagination, this.dbconnection);
    }
    async update(data, filterWith, table) {
        return await (0, update_1.updateItemSinDatabase)(data, table, filterWith, this.dbconnection);
    }
    async amountTimeGraphPlot(options) {
        return await (0, graph_1.amountTimeGetGraphData)(options, this.dbconnection);
    }
    async deleleItem(filterWith, table, filterWithout) {
        return await (0, delete_1.deleteItemsFromList)(filterWith, table, this.dbconnection, filterWithout);
    }
}
exports.Pipeline = Pipeline;

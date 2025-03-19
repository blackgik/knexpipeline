"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneItem = void 0;
const findOneItem = async (filterWith, table, col, dbconnection, filterWithout) => {
    let query = dbconnection(table).first(col);
    if (Array.isArray(filterWith)) {
        filterWith.forEach((filter) => {
            query = query.orWhere(filter);
        });
    }
    else {
        query = query.where(filterWith);
    }
    // filtering out elements
    if (Array.isArray(filterWithout)) {
        filterWithout.forEach((filter) => {
            query = query.orWhereNot(filter);
        });
    }
    else if (filterWithout) {
        query = query.whereNot(filterWithout);
    }
    return await query;
};
exports.findOneItem = findOneItem;

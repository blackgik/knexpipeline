"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countItemsInDB = void 0;
const countItemsInDB = async (dbconnection, filterWith, // can be an array for or values OR and for AND values
table, filterWithout = {}, timeFilters) => {
    let query = dbconnection(table).count();
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
    if (timeFilters?.key) {
        query = query.whereBetween(timeFilters.key, [
            timeFilters.fromTime,
            timeFilters.toTime
        ]);
    }
    const count = await query;
    return { count };
};
exports.countItemsInDB = countItemsInDB;

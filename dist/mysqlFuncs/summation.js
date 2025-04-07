"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amountSummation = void 0;
const amountSummation = async (dbconnection, options) => {
    let query = dbconnection(options.table);
    if (Array.isArray(options.filterWith)) {
        options.filterWith.forEach((filter) => {
            query = query.orWhere(filter);
        });
    }
    else {
        query = query.where(options.filterWith);
    }
    if (Array.isArray(options.filterWithout)) {
        options.filterWithout.forEach((filter) => {
            query = query.orWhereNot(filter);
        });
    }
    else if (options.filterWithout &&
        Object.keys(options.filterWithout).length) {
        query = query.whereNot(options.filterWithout);
    }
    if (options.timeFilters?.key) {
        query = query.whereBetween(options.timeFilters.key, [
            options.timeFilters.fromTime,
            options.timeFilters.toTime
        ]);
    }
    const sum = await query.sum(`${options.sumField} as sum`);
    return { sum: sum[0]["sum"] };
};
exports.amountSummation = amountSummation;

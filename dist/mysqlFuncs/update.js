"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemSinDatabase = void 0;
const updateItemSinDatabase = async (data, table, filterWith, dbconnections) => {
    const updateData = await dbconnections(table).update(data).where(filterWith);
    return { updateData, data, updated_at: new Date() };
};
exports.updateItemSinDatabase = updateItemSinDatabase;

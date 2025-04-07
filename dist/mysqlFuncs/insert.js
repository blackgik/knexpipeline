"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertItemIntoDatabase = void 0;
const insertItemIntoDatabase = async (data, table, dbconnection) => {
    await dbconnection(table).insert(data);
    return { ...data, created_at: new Date(), updated_at: new Date() };
};
exports.insertItemIntoDatabase = insertItemIntoDatabase;

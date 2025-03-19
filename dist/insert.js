export const insertItemIntoDatabase = async (data, table, dbconnection) => {
    await dbconnection(table).insert(data);
    return { ...data, created_at: new Date(), updated_at: new Date() };
};

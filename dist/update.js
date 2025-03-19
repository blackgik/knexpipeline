export const updateItemSinDatabase = async (data, table, filterWith, dbconnections) => {
    const updateData = await dbconnections(table).update(data).where(filterWith);
    return { updateData, data, updated_at: new Date() };
};

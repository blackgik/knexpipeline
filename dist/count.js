export const countItemsInDB = async (dbconnection, filterWith, // can be an array for or values OR and for AND values
table, filterWithout = {}) => {
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
    const count = await query;
    return { count };
};

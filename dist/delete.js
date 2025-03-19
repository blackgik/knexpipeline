export const deleteItemsFromList = async (filterWith, table, dbconnection, filterWithout) => {
    let query = dbconnection(table).del();
    if ((!Array.isArray(filterWith) && !Object.keys(filterWith).length) ||
        filterWith.length === 0) {
        if (Array.isArray(filterWithout)) {
            filterWithout.forEach((filter) => {
                query = query.orWhereNot(filter);
            });
        }
        else if (filterWithout) {
            query = query.whereNot(filterWithout);
        }
    }
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

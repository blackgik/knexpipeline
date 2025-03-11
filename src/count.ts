import { Knex } from "knex";

export const countItemsInDB = async (
	dbconnection: Knex,
	filterWith: Record<string, any>[] | Record<string, any>, // can be an array for or values OR and for AND values
	table: string,
	filterWithout: Record<string, any> | Record<string, any>[] = {}
) => {
	let query = dbconnection(table).count();

	if (Array.isArray(filterWith)) {
		filterWith.forEach((filter: Record<string, any>) => {
			query = query.orWhere(filter);
		});
	} else {
		query = query.where(filterWith);
	}

	// filtering out elements
	if (Array.isArray(filterWithout)) {
		filterWithout.forEach((filter: Record<string, any>) => {
			query = query.orWhereNot(filter);
		});
	} else if (filterWithout) {
		query = query.whereNot(filterWithout);
	}

	const count = await query;

	return { count };
};

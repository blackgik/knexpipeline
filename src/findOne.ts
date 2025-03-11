import { Knex } from "knex";

export const findOneItem = async (
	filterWith: Record<string, any> | Record<string, any>[],
	table: string,
	col: string[],
	dbconnection: Knex,
	filterWithout?: Record<string, any> | Record<string, any>[]
) => {
	let query = dbconnection(table).first(col);

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

	return await query;
};

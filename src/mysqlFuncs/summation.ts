import { Knex } from "knex";
import { IfilterSummation } from "src/interfaces";

export const amountSummation = async (
	dbconnection: Knex,
	options: IfilterSummation
): Promise<{ sum: number }> => {
	let query = dbconnection(options.table);

	if (Array.isArray(options.filterWith)) {
		options.filterWith.forEach((filter: Record<string, any>) => {
			query = query.orWhere(filter);
		});
	} else {
		query = query.where(options.filterWith);
	}

	if (Array.isArray(options.filterWithout)) {
		options.filterWithout.forEach((filter: Record<string, any>) => {
			query = query.orWhereNot(filter);
		});
	} else if (
		options.filterWithout &&
		Object.keys(options.filterWithout).length
	) {
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

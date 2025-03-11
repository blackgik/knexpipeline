import { Knex } from "knex";
import { IfilterFind } from "./interfaces";

export const findAllIemsNoPopulate = async (
	options: IfilterFind,
	dbconnection: Knex,
	needsPagination: boolean
) => {
	options.cols = options.cols ? options.cols : [];
	options.offset = options.offset ? options.offset : 0;
	options.limit = options.limit ? options.limit : 0;

	let query = dbconnection.select(options.cols).from(options.table);

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
	} else if (options.filterWithout) {
		query = query.whereNot(options.filterWithout);
	}

	if (options.searchWord) {
		query = query.andWhere((qb: Knex) => {
			qb.where((innerQB: Knex) => {
				options.searchkeys.forEach((searchKey, index) => {
					if (index === 0) {
						innerQB.where(searchKey, "like", `%${options.searchWord}%`);
					} else {
						innerQB.orWhere(searchKey, "like", `%${options.searchWord}%`);
					}
				});
			});
		});
	}

	if (options.cols.length > 0) {
		options.cols.map((column: string) => {
			if (/\b as \b/g.test(column)) {
				const regex = new RegExp(`\\b${"as"}\\b`, "g");
				column = column.split(regex)[0].trim();
			}

			return column;
		});

		query = query.groupBy(options.cols);
	}

	if (options.timeFilters) {
		query = query.whereBetween(options.timeFilters.key, [
			options.timeFilters.fromTime,
			options.timeFilters.toTime
		]);
	}

	if (needsPagination) {
		const result = await query
			.orderBy(options.orderBy.col, options.orderBy.order)
			.offset(options.offset)
			.limit(options.limit);

		const count = await query.count("* as count");

		return { count: count || 0, result };
	}
	const result = await query.orderBy(
		options.orderBy.col,
		options.orderBy.order
	);

	return { result };
};

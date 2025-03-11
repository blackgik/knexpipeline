import { Knex } from "knex";
import { IfilterPopulate } from "./interfaces";

export const findAndJoinTableFetch = async (
	options: IfilterPopulate,
	needsPagination: boolean,
	dbconnection: Knex
) => {
	options.foreignKeys = options.foreignKeys ? options.foreignKeys : [];
	options.offset = options.offset ? options.offset : 0;
	options.limit = options.limit ? options.limit : 0;
	options.aggregations = options.aggregations ? options.aggregations : [];
	options.groupBy = options.groupBy ? options.groupBy : [];

	if (!options.tableNames || options.tableNames.length < 1) {
		return { count: 0, result: [] };
	}

	const primaryTble = options.tableNames[0];

	let query = dbconnection.select(options.cols).from(primaryTble);

	for (let Joiner of options.foreignKeys) {
		query = query.join(
			Joiner.joinTable,
			`${primaryTble}.${Joiner.foreignKey}`,
			"=",
			`${Joiner.localKey}`
		);
	}

	if (Array.isArray(options.filterWith)) {
		options.filterWith.forEach((filter: Record<string, any>) => {
			query = query.orWhere(filter);
		});
	} else {
		query = query.where(options.filterWith);
	}

	// filtering out elements
	if (Array.isArray(options.filterWithout)) {
		options.filterWithout.forEach((filter: Record<string, any>) => {
			query = query.orWhereNot(filter);
		});
	} else if (options.filterWithout) {
		query = query.whereNot(options.filterWithout);
	}

	if (options.filterRaw?.length) {
		options.filterRaw.forEach((rawText) => {
			query.whereRaw(rawText);
		});
	}

	if (options.searchWord) {
		query = query.andWhere((qb) => {
			qb.where((innerQB) => {
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

	if (options.timeFilters) {
		query = query.whereBetween(options.timeFilters.key, [
			options.timeFilters.fromTime,
			options.timeFilters.toTime
		]);
	}

	// Aggregations
	if (options.aggregations.length > 0) {
		options.aggregations.forEach((agg) => {
			const raw = `${agg.aggType}(${agg.col}) as ${agg.alias}`;

			query = query.select(dbconnection.raw(raw));
		});
	}

	query = query.groupBy(options.groupBy);

	const queryClone = query.clone();

	const count = await queryClone.count("* as count");

	if (needsPagination) {
		const result = await query
			.orderBy(options.orderBy.col, options.orderBy.order)
			.offset(options.offset)
			.limit(options.limit);

		return { count: count.length || 0, result };
	}

	const result = await query.orderBy(
		options.orderBy.col,
		options.orderBy.order
	);

	return { result };
};

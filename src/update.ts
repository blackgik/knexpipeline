import { Knex } from "knex";

export const updateItemSinDatabase = async (
	data: Record<string, any> | Record<string, any>[],
	table: string,
	filterWith: Record<string, any>,
	dbconnections: Knex
) => {
	const updateData = await dbconnections(table).update(data).where(filterWith);

	return { updateData, data, updated_at: new Date() };
};

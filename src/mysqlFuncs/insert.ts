import { Knex } from "knex";

export const insertItemIntoDatabase = async (
	data: Record<string, any> | Record<string, any>[],
	table: string,
	dbconnection: Knex
) => {
	await dbconnection(table).insert(data);

	return { ...data, created_at: new Date(), updated_at: new Date() };
};

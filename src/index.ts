import { Knex } from "knex";
import { countItemsInDB } from "./count";
import { findAllIemsNoPopulate } from "./find";
import { IfilterFind, IfilterPopulate } from "./interfaces";
import { findOneItem } from "./findOne";
import { insertItemIntoDatabase } from "./insert";
import { findAndJoinTableFetch } from "./populate";
import { updateItemSinDatabase } from "./update";

export class Pipeline {
	public dbconnection;
	public module;

	constructor(dbconnection: Knex, module: string) {
		this.dbconnection = dbconnection;
		this.module = module;
	}

	async count(
		filterWith: Record<string, any>[] | Record<string, any>,
		table: string,
		filterWithout?: Record<string, any> | Record<string, any>[]
	) {
		// initiating count steps
		return await countItemsInDB(
			this.dbconnection,
			filterWith,
			table,
			filterWithout
		);
	}

	async find(options: IfilterFind, needsPagination: boolean) {
		return await findAllIemsNoPopulate(
			options,
			this.dbconnection,
			needsPagination
		);
	}

	async findOne(
		filterWith: Record<string, any>[] | Record<string, any>,
		table: string,
		col?: string[],
		filterWithout?: Record<string, any> | Record<string, any>[]
	) {
		col = col?.length ? col : [];
		return await findOneItem(
			filterWith,
			table,
			col,
			this.dbconnection,
			filterWithout
		);
	}

	async insert(
		data: Record<string, any> | Record<string, any>[],
		table: string
	) {
		return await insertItemIntoDatabase(data, table, this.dbconnection);
	}

	async populate(options: IfilterPopulate, needsPagination: boolean) {
		return await findAndJoinTableFetch(
			options,
			needsPagination,
			this.dbconnection
		);
	}

	async update(
		data: Record<string, any> | Record<string, any>[],
		filterWith: Record<string, any>,
		table: string
	) {
		return await updateItemSinDatabase(
			data,
			table,
			filterWith,
			this.dbconnection
		);
	}
}

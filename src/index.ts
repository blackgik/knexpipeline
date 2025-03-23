import { Knex } from "knex";
import { countItemsInDB } from "./mysqlFuncs/count";
import { findAllIemsNoPopulate } from "./mysqlFuncs/find";
import { IfilterFind, IfilterGraphOps, IfilterPopulate } from "./interfaces";
import { findOneItem } from "./mysqlFuncs/findOne";
import { insertItemIntoDatabase } from "./mysqlFuncs/insert";
import { findAndJoinTableFetch } from "./mysqlFuncs/populate";
import { updateItemSinDatabase } from "./mysqlFuncs/update";
import { amountTimeGetGraphData } from "./mysqlFuncs/graph";
import { deleteItemsFromList } from "./mysqlFuncs/delete";

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

	async amountTimeGraphPlot(options: IfilterGraphOps) {
		return await amountTimeGetGraphData(options, this.dbconnection);
	}

	async deleleItem(
		filterWith: Record<string, any>[] | Record<string, any>,
		table: string,
		filterWithout?: Record<string, any> | Record<string, any>[]
	) {
		return await deleteItemsFromList(
			filterWith,
			table,
			this.dbconnection,
			filterWithout
		);
	}
}

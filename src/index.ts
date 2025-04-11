import { Knex } from "knex";
import { countItemsInDB } from "./mysqlFuncs/count";
import { findAllIemsNoPopulate } from "./mysqlFuncs/find";
import {
	IfilterFind,
	IfilterGraphOps,
	IfilterPopulate,
	IfilterSummation
} from "./interfaces";
import { findOneItem } from "./mysqlFuncs/findOne";
import { insertItemIntoDatabase } from "./mysqlFuncs/insert";
import { findAndJoinTableFetch } from "./mysqlFuncs/populate";
import { updateItemSinDatabase } from "./mysqlFuncs/update";
import { amountTimeGetGraphData } from "./mysqlFuncs/graph";
import { deleteItemsFromList } from "./mysqlFuncs/delete";
import { amountSummation } from "./mysqlFuncs/summation";

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
		filterWithout?: Record<string, any> | Record<string, any>[],
		timeFilters?: { key: string; fromTime: Date; toTime: Date }
	): Promise<{ "count(*)": number }[] | any> {
		// initiating count steps
		return await countItemsInDB(
			this.dbconnection,
			filterWith,
			table,
			filterWithout,
			timeFilters
		);
	}

	async find(
		options: IfilterFind,
		needsPagination: boolean
	): Promise<
		| {
				count: any[];
				result: any[];
		  }
		| {
				result: any[];
				count?: undefined;
		  }
	> {
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
	): Promise<Record<string, any>> {
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
	): Promise<{
		created_at: Date;
		updated_at: Date;
	}> {
		return await insertItemIntoDatabase(data, table, this.dbconnection);
	}

	async populate(
		options: IfilterPopulate,
		needsPagination: boolean
	): Promise<
		| {
				count: number;
				result: any[] | any[];
		  }
		| {
				result: any[] | any[];
				count?: undefined;
		  }
	> {
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
	): Promise<{
		updateData: number;
		data: Record<string, any> | Record<string, any>[];
		updated_at: Date;
	}> {
		return await updateItemSinDatabase(
			data,
			table,
			filterWith,
			this.dbconnection
		);
	}

	async amountTimeGraphPlot(
		options: IfilterGraphOps
	): Promise<Array<Array<{ x_axis: string; y_axis: number }>>> {
		return await amountTimeGetGraphData(options, this.dbconnection);
	}

	async deleleItem(
		filterWith: Record<string, any>[] | Record<string, any>,
		table: string,
		filterWithout?: Record<string, any> | Record<string, any>[]
	): Promise<number> {
		return await deleteItemsFromList(
			filterWith,
			table,
			this.dbconnection,
			filterWithout
		);
	}

	async sum(options: IfilterSummation) {
		return await amountSummation(this.dbconnection, options);
	}
}

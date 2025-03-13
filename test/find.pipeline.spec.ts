import knex from "knex";
import { expect } from "chai";
import { Pipeline } from "../src/index";

describe("Find Pipeline class test", () => {
	let pipeline: Pipeline;

	before(() => {
		const connection = knex({
			client: "mysql",
			connection: {
				host: "localhost",
				port: 3306,
				user: "root",
				password: "odogwuPassword",
				database: "todos"
			}
		});
		const module: string = "mysql";
		pipeline = new Pipeline(connection, module);
	});

	it("should fetch multiple task with pagination and array not empty", async () => {
		const options = {
			filterWith: { name: "Dishes" },
			searchkeys: [],
			searchWord: "string",
			table: "tasks",
			cols: [],
			orderBy: { order: "DESC", col: "created_at" },
			offset: 1,
			limit: 6,
			filterWithout: { id: "a33a5e02-5357-433e-a58e-669be88b4427" },
			timeFilters: {
				key: "created_at",
				fromTime: new Date("2023-10-14 11:01:01"),
				toTime: new Date("2025-03-10 11:01:01")
			}
		};
		const insertData = await pipeline.find(options, true);

		expect(insertData).to.haveOwnProperty("result");
		expect(insertData).to.haveOwnProperty("count");
		expect(insertData.result).to.be.an("array");

		insertData.result.forEach((item) => {
			if (item) {
				expect(item).to.be.an("object");
			}
		});

		insertData.result.forEach((item) => {
			Object.entries(item).forEach(([key, value]) => {
				expect(value).to.not.be.undefined;
			});
		});

		insertData.result.forEach((item) => {
			Object.values(item).forEach((value) => {
				expect(value).to.be.oneOf([
					"string",
					"number",
					"boolean",
					"object",
					"array",
					"symbol"
				]); // Modify as needed
			});
		});
	});

	it("should fetch multiple task with pagination and array empty", async () => {
		const options = {
			filterWith: { id: "a33a5e02-5357-433e-a58e-669be88b4427" },
			searchkeys: [],
			searchWord: "string",
			table: "tasks",
			cols: [],
			orderBy: { order: "DESC", col: "created_at" },
			offset: 1,
			limit: 6,
			filterWithout: { name: "Dishes" },
			timeFilters: {
				key: "created_at",
				fromTime: new Date("2023-10-14 11:01:01"),
				toTime: new Date("2025-03-10 11:01:01")
			}
		};
		const insertData = await pipeline.find(options, true);

		expect(insertData).to.haveOwnProperty("result");
		expect(insertData).to.haveOwnProperty("count");
		expect(insertData.result).to.be.an("array");
		expect(insertData.result).to.be.empty;
	});

	it("Should search for a record, using 'searchKeys' and 'search' fields", async () => {
		const options = {
			filterWith: { id: "a33a5e02-5357-433e-a58e-669be88b4427" },
			searchkeys: ["name", "description"],
			searchWord: "weekly",
			table: "tasks",
			cols: [],
			orderBy: { order: "DESC", col: "created_at" },
			offset: 1,
			limit: 6,
			filterWithout: { name: "Dishes" },
			timeFilters: {
				key: "created_at",
				fromTime: new Date("2023-10-14 11:01:01"),
				toTime: new Date("2025-03-10 11:01:01")
			}
		};
		const insertData = await pipeline.find(options, true);

		expect(insertData).to.haveOwnProperty("result");
		expect(insertData).to.haveOwnProperty("count");
		expect(insertData.result).to.be.an("array");
		expect(insertData.result).to.be.empty;
	});

	it("should fetch multiple task without pagination and array not empty", async () => {
		const options = {
			filterWith: { name: "Dishes" },
			searchkeys: [],
			searchWord: "string",
			table: "tasks",
			cols: [],
			orderBy: { order: "DESC", col: "created_at" },
			offset: 1,
			limit: 6,
			filterWithout: { id: "a33a5e02-5357-433e-a58e-669be88b4427" },
			timeFilters: {
				key: "created_at",
				fromTime: new Date("2023-10-14 11:01:01"),
				toTime: new Date("2025-03-10 11:01:01")
			}
		};
		const insertData = await pipeline.find(options, false);

		expect(insertData).to.haveOwnProperty("result");
		expect(insertData).to.not.haveOwnProperty("count");
		expect(insertData.result).to.be.an("array");

		insertData.result.forEach((item) => {
			if (item) {
				expect(item).to.be.an("object");
			}
		});
	});

	it("should fetch multiple task without pagination and array empty", async () => {
		const options = {
			filterWith: { id: "a33a5e02-5357-433e-a58e-669be88b4427" },
			searchkeys: ["name", "description"],
			searchWord: "string",
			table: "tasks",
			cols: [],
			orderBy: { order: "DESC", col: "created_at" },
			offset: 1,
			limit: 6,
			filterWithout: { name: "Dishes" },
			timeFilters: {
				key: "created_at",
				fromTime: new Date("2023-10-14 11:01:01"),
				toTime: new Date("2025-03-10 11:01:01")
			}
		};
		const insertData = await pipeline.find(options, false);

		expect(insertData).to.haveOwnProperty("result");
		expect(insertData).to.not.haveOwnProperty("count");
		expect(insertData.result).to.be.an("array");
		expect(insertData.result).to.be.empty;
	});
});

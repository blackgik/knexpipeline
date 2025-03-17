import knex from "knex";
import { expect } from "chai";
import { Pipeline } from "../src/index";

describe("Delete Pipeline class test for amount vs time", () => {
	let pipeline: Pipeline;

	before(() => {
		const connection = knex({
			client: "mysql",
			connection: {
				host: "localhost",
				port: 3306,
				user: "root",
				password: "ben@newton#1996#",
				database: "todos"
			}
		});
		const module: string = "mysql";
		pipeline = new Pipeline(connection, module);
	});

	it("Should delete an item with filter options", async () => {
		const filter = { id: "01140176-817b-49e0-b903-8158e7479776" };
		const table = "tasks";

		const deleteItem = await pipeline.deleleItem(filter, table);

		expect(deleteItem).to.be.a("number");
	});

	it("Should delete an item with filterOut options", async () => {
		const filter = { id: "01140176-817b-49e0-b903-8158e7479776" };
		const table = "tasks";

		const filterOut = { name: "Dishes" };

		const deleteItem = await pipeline.deleleItem(filter, table, filterOut);

		expect(deleteItem).to.be.a("number");
	});

	it("Should delete an item without filter but with filterOut options", async () => {
		const filter = {};
		const table = "tasks";

		const filterOut = { id: "066261a1-1498-4a47-b32a-da8725fbb61b" };

		const deleteItem = await pipeline.deleleItem(filter, table, filterOut);

		expect(deleteItem).to.be.a("number");
	});
});

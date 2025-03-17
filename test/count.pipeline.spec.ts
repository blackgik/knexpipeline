import knex from "knex";
import { expect } from "chai";
import { Pipeline } from "../src/index";

describe("Count Pipeline class test", () => {
	let pipeline: Pipeline;

	before(() => {
		const connection = knex({
			client: "mysql",
			connection: {
				host: "localhost",
				port: 3306,
				user: "root",
				password: "oodogwupassword",
				database: "todos"
			}
		});
		const module: string = "mysql";
		pipeline = new Pipeline(connection, module);
	});

	it("should count products without filtering out", async () => {
		const filterWith = { name: "Dishes" };
		const table = "tasks";
		const { count } = await pipeline.count(filterWith, table);

		const obj = count[0];

		expect(count).to.be.an("array");
		expect(obj).to.be.an("object");
		expect(obj).to.have.property("count(*)");
	});

	it("should count products with filtering out", async () => {
		const filterWith = { name: "Dishes" };
		const filterWithout = { name: "Dishes" };
		const table = "tasks";
		const { count } = await pipeline.count(filterWith, table, filterWithout);

		const obj = count[0];

		expect(count).to.be.an("array");
		expect(obj).to.be.an("object");
		expect(obj).to.have.property("count(*)");
	});
});

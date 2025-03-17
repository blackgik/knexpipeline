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
				password: "ben@newton#1996#",
				database: "todos"
			}
		});
		const module: string = "mysql";
		pipeline = new Pipeline(connection, module);
	});

	it("should find one data with filter", async () => {
		const filter = {};
		const table = "tasks";
		const data = await pipeline.findOne(filter, table);

		expect(data).to.not.be.empty;
		expect(data).to.be.an("object");
		expect(data).to.not.be.undefined;

		Object.entries(data).forEach(([key, value]) => {
			expect(value).to.not.be.undefined;
		});
	});

	it("should find one data with filter filterOut", async () => {
		const filter = {};
		const filterOut = { name: "a33a5e02-5357-433e-a58e-669be88b4427" };
		const table = "tasks";
		const data = await pipeline.findOne(filter, table, []);

		expect(data).to.not.be.empty;
		expect(data).to.be.an("object");
		expect(data).to.not.be.undefined;

		Object.entries(data).forEach(([key, value]) => {
			expect(value).to.not.be.undefined;
		});
	});

	it("should find one data with filter select column", async () => {
		const filter = {};
		const table = "tasks";
		const data = await pipeline.findOne(filter, table, ["name"]);

		expect(data).to.not.be.empty;
		expect(data).to.be.an("object");
		expect(data).to.not.be.undefined;
		expect(data).to.have.property("name");

		Object.entries(data).forEach(([key, value]) => {
			expect(value).to.not.be.undefined;
		});
	});

	it("should find no data with filter select column", async () => {
		const filter = { id: "d33a5e02-5357-433e-a58e-669be88b4429" };
		const table = "tasks";
		const data = await pipeline.findOne(filter, table, ["name"]);

		expect(data).to.be.undefined;
	});
});

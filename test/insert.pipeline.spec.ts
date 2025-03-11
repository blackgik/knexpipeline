import knex from "knex";
import { randomUUID } from "crypto";
import { expect } from "chai";
import { Pipeline } from "../src/index";

describe("Insertion Pipeline Test", () => {
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

	it("should create a single task", async () => {
		const insertData = await pipeline.insert(
			{ id: randomUUID(), name: "Dishes", description: "Wash the dishes" },
			"tasks"
		);

		expect(insertData).to.haveOwnProperty("created_at");
	});

	it("should create  multiple task task", async () => {
		const insertData = await pipeline.insert(
			[{ id: randomUUID(), name: "Dishes", description: "Wash the dishes" }],
			"tasks"
		);

		expect(insertData).to.haveOwnProperty("created_at");
	});
});

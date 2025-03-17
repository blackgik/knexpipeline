import knex from "knex";
import { randomUUID, UUID } from "crypto";
import { expect } from "chai";
import { Pipeline } from "../src/index";

describe("Insertion Pipeline Test", () => {
	let pipeline: Pipeline, uuid: UUID, uuid2: UUID;

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

		uuid = randomUUID();
		uuid2 = randomUUID();
	});

	it("should create a single task", async () => {
		const insertData = await pipeline.insert(
			{ id: uuid, name: "Dishes", description: "Wash the dishes" },
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

	it("should assign a task to user", async () => {
		const insertData = await pipeline.insert(
			{ id: uuid2, name: "John Doe", task_id: uuid },
			"user"
		);

		expect(insertData).to.haveOwnProperty("created_at");
	});
});

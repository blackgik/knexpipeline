import knex from "knex";
import { expect } from "chai";
import { Pipeline } from "../src/index";

describe("Populate Pipeline class test", () => {
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

	it("should combine two tables without pagination", async () => {
		// { aggType: "", col: "", alias: "string" }
		const options = {
			filterWith: { "user.name": "John Doe" },
			searchkeys: [],
			searchWord: "",
			tableNames: ["user", "tasks"],
			cols: [],
			orderBy: { order: "DESC", col: "user.name" },
			offset: 0,
			limit: 0,
			filterWithout: {},
			groupBy: [],
			foreignKeys: [
				{ joinTable: "tasks", foreignKey: "task_id", localKey: "id" }
			],
			timeFilters: null,
			aggregations: [],
			filterRaw: []
		};

		const data = await pipeline.populate(options, false);

		expect(data).to.haveOwnProperty("result");
		expect(data).to.not.haveOwnProperty("count");
		expect(data.result).to.be.an("array");
		expect(data.result.length).to.be.greaterThan(0);

		data.result.forEach((item) => {
			if (item) {
				expect(item).to.be.an("object");
			}
		});
	});

	it("should combine two tables with pagination", async () => {
		// { aggType: "", col: "", alias: "string" }
		const options = {
			filterWith: { "user.name": "John Doe" },
			searchkeys: [],
			searchWord: "",
			tableNames: ["user", "tasks"],
			cols: [],
			orderBy: { order: "DESC", col: "user.name" },
			offset: 1,
			limit: 10,
			filterWithout: {},
			groupBy: [],
			foreignKeys: [
				{ joinTable: "tasks", foreignKey: "task_id", localKey: "id" }
			],
			timeFilters: null,
			aggregations: [],
			filterRaw: []
		};

		const data = await pipeline.populate(options, true);

		expect(data).to.haveOwnProperty("result");
		expect(data).to.haveOwnProperty("count");
		expect(data.result).to.be.an("array");
		expect(data.result.length).to.be.greaterThanOrEqual(0);

		if (data.count) {
			const availablePages = Math.ceil(data.count / options.offset);

			expect(availablePages).to.be.a("number");
			expect(availablePages).to.be.greaterThanOrEqual(0);
		}

		data.result.forEach((item) => {
			if (item) {
				expect(item).to.be.an("object");
			}
		});
	});

	it("should combine two tables and search not empty", async () => {
		// { aggType: "", col: "", alias: "string" }
		const options = {
			filterWith: { "user.id": "fe83ed51-9233-45c7-98c5-b82b9d13b9ff" },
			searchkeys: ["tasks.name", "tasks.description", "user.name"],
			searchWord: "Dishes",
			tableNames: ["user", "tasks"],
			cols: [],
			orderBy: { order: "DESC", col: "user.name" },
			offset: 0,
			limit: 10,
			filterWithout: {},
			groupBy: [],
			foreignKeys: [
				{ joinTable: "tasks", foreignKey: "task_id", localKey: "id" }
			],
			timeFilters: null,
			aggregations: [],
			filterRaw: []
		};

		const data = await pipeline.populate(options, true);

		expect(data).to.haveOwnProperty("result");
		expect(data).to.haveOwnProperty("count");
		expect(data.result).to.be.an("array");
		expect(data.result.length).to.be.greaterThanOrEqual(0);

		if (data.count) {
			const availablePages = Math.ceil(data.count / options.offset);

			expect(availablePages).to.be.a("number");
			expect(availablePages).to.be.greaterThanOrEqual(0);
		}

		data.result.forEach((item) => {
			if (item) {
				expect(item).to.be.an("object");
			}
		});
	});

	it("should combine two tables with specific columns", async () => {
		// { aggType: "", col: "", alias: "string" }
		const options = {
			filterWith: { "user.name": "John Doe" },
			searchkeys: ["tasks.name", "tasks.description", "user.name"],
			searchWord: "John",
			tableNames: ["user", "tasks"],
			cols: ["user.name", "tasks.description"],
			orderBy: { order: "DESC", col: "user.name" },
			offset: 0,
			limit: 10,
			filterWithout: {},
			groupBy: ["tasks.name", "tasks.description", "user.name"],
			foreignKeys: [
				{ joinTable: "tasks", foreignKey: "task_id", localKey: "id" }
			],
			timeFilters: null,
			aggregations: [],
			filterRaw: []
		};

		const data = await pipeline.populate(options, true);

		expect(data).to.haveOwnProperty("result");
		expect(data).to.haveOwnProperty("count");
		expect(data.result).to.be.an("array");
		expect(data.result.length).to.be.greaterThan(0);

		if (data.count) {
			const availablePages = Math.ceil(data.count / options.offset);

			expect(availablePages).to.be.a("number");
			expect(availablePages).to.be.greaterThanOrEqual(0);
		}

		data.result.forEach((item) => {
			if (item) {
				expect(item).to.be.an("object");
				expect(item).to.have.property("name");
				expect(item).to.have.property("description");
				expect(Object.keys(item)).to.have.length(2);
			}
		});
	});

	it("should combine two tables with specific columns and group Data", async () => {
		// { aggType: "", col: "", alias: "string" }
		const options = {
			filterWith: { "user.name": "John Doe" },
			searchkeys: ["tasks.name", "tasks.description", "user.name"],
			searchWord: "John",
			tableNames: ["user", "tasks"],
			cols: ["user.name", "tasks.description"],
			orderBy: { order: "DESC", col: "user.name" },
			offset: 0,
			limit: 10,
			filterWithout: {},
			groupBy: ["user.name", "tasks.description"],
			foreignKeys: [
				{ joinTable: "tasks", foreignKey: "task_id", localKey: "id" }
			],
			timeFilters: null,
			aggregations: [],
			filterRaw: []
		};

		const data = await pipeline.populate(options, true);

		expect(data).to.haveOwnProperty("result");
		expect(data).to.haveOwnProperty("count");
		expect(data.result).to.be.an("array");
		expect(data.result.length).to.be.greaterThan(0);

		if (data.count) {
			const availablePages = Math.ceil(data.count / options.offset);

			expect(availablePages).to.be.a("number");
			expect(availablePages).to.be.greaterThanOrEqual(0);
		}

		data.result.forEach((item) => {
			if (item) {
				expect(item).to.be.an("object");
				expect(item).to.have.property("name");
				expect(item).to.have.property("description");
				expect(Object.keys(item)).to.have.length(2);
			}
		});
	});

	it("should find Data within the set range", async () => {
		// { aggType: "", col: "", alias: "string" }
		const fromTime = new Date(Date.now() - 1000 * 60 * 60 * 24 * 5);
		const options = {
			filterWith: { "user.name": "John Doe" },
			searchkeys: ["tasks.name", "tasks.description", "user.name"],
			searchWord: "john",
			tableNames: ["user", "tasks"],
			cols: ["user.name", "tasks.description", "tasks.created_at"],
			orderBy: { order: "DESC", col: "user.name" },
			offset: 0,
			limit: 10,
			filterWithout: {},
			groupBy: ["user.name", "tasks.description", "tasks.created_at"],
			foreignKeys: [
				{ joinTable: "tasks", foreignKey: "task_id", localKey: "id" }
			],
			timeFilters: {
				key: "tasks.created_at",
				fromTime: fromTime,
				toTime: new Date()
			},
			aggregations: [],
			filterRaw: []
		};

		const data = await pipeline.populate(options, true);

		expect(data).to.haveOwnProperty("result");
		expect(data).to.haveOwnProperty("count");
		expect(data.result).to.be.an("array");
		expect(data.result.length).to.be.greaterThan(0);

		if (data.count) {
			const availablePages = Math.ceil(data.count / options.offset);

			expect(availablePages).to.be.a("number");
			expect(availablePages).to.be.greaterThanOrEqual(0);
		}

		data.result.forEach((item) => {
			if (item) {
				const createdAt = new Date(item.created_at); // Example date

				const startDate = fromTime;
				const endDate = new Date();

				const iswithinRange = createdAt > startDate || createdAt < endDate;

				expect(item).to.be.an("object");
				expect(iswithinRange).to.be.true;
			}
		});
	});

	it("should aggregate and count Data", async () => {
		// { aggType: "", col: "", alias: "string" }

		const options = {
			filterWith: { "user.name": "John Doe" },
			searchkeys: ["tasks.name", "tasks.description", "user.name"],
			searchWord: "John",
			tableNames: ["user", "tasks"],
			cols: ["user.name"],
			orderBy: { order: "DESC", col: "user.name" },
			offset: 0,
			limit: 10,
			filterWithout: {},
			groupBy: ["user.name"],
			foreignKeys: [
				{ joinTable: "tasks", foreignKey: "task_id", localKey: "id" }
			],
			timeFilters: null,
			aggregations: [
				{ aggType: "COUNT", col: "user.name", alias: "total_count" }
			],
			filterRaw: []
		};

		const data = await pipeline.populate(options, true);

		expect(data).to.haveOwnProperty("result");
		expect(data).to.haveOwnProperty("count");
		expect(data.result).to.be.an("array");
		expect(data.result.length).to.be.greaterThan(0);

		if (data.count) {
			const availablePages = Math.ceil(data.count / options.offset);

			expect(availablePages).to.be.a("number");
			expect(availablePages).to.be.greaterThanOrEqual(0);
		}

		data.result.forEach((item) => {
			if (item) {
				expect(item).to.be.an("object");
				expect(item).to.have.property("total_count");
			}
		});
	});
});

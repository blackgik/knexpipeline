import knex from "knex";
import { expect } from "chai";
import { Pipeline } from "../src/index";

describe("Graph Pipeline class test for amount vs time", () => {
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

	const fromTime = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60);
	const thisMonth = new Date().getMonth();
	const thisYear = new Date().getFullYear();

	it("Should return an array of Data for YEAR Filter", async () => {
		const filterOps = {
			timeFilter: { startDate: fromTime, endDate: new Date() },
			table: "tasks",
			filterBy: "year",
			monyrDefault: thisMonth + 1,
			yearDefault: thisYear,
			timeChoiceField: "created_at",
			sumChoiceField: "amount",
			dataFilter: { name: "Dishes" }
		};

		const graph = await pipeline.amountTimeGraphPlot(filterOps);

		expect(graph).to.be.an("array");
		expect(graph.length).to.be.equal(2);
		expect(graph[0]).to.be.an("array");

		const yearCal = [
			"JAN",
			"FEB",
			"MAR",
			"APR",
			"MAY",
			"JUN",
			"JUL",
			"AUG",
			"SEP",
			"OCT",
			"NOV",
			"DEC"
		];

		graph[0].forEach((item: Record<string, any>) => {
			const keys = Object.keys(item);

			expect(item).to.be.an("object");
			expect(keys[0]).to.be.equals("x_axis");
			expect(keys[1]).to.be.equals("y_axis");
			expect(item[keys[0]]).to.be.a("string");
			expect(item[keys[1]]).to.be.a("number");
			expect(yearCal).to.include(item[keys[0]]);
		});
	});

	it("Should return an array of Data for THIS MONTH Filter", async () => {
		const filterOps = {
			timeFilter: { startDate: fromTime, endDate: new Date() },
			table: "tasks",
			filterBy: "month",
			monyrDefault: thisMonth + 1,
			yearDefault: thisYear,
			timeChoiceField: "created_at",
			sumChoiceField: "amount",
			dataFilter: { name: "Dishes" }
		};

		const graph = await pipeline.amountTimeGraphPlot(filterOps);

		expect(graph).to.be.an("array");
		expect(graph.length).to.be.equal(2);
		expect(graph[0]).to.be.an("array");

		const yearCal = ["Week-1", "Week-2", "Week-3", "Week-4", "Week-5"];

		graph[0].forEach((item: Record<string, any>) => {
			const keys = Object.keys(item);

			expect(item).to.be.an("object");
			expect(keys[0]).to.be.equals("x_axis");
			expect(keys[1]).to.be.equals("y_axis");
			expect(item[keys[0]]).to.be.a("string");
			expect(item[keys[1]]).to.be.a("number");
			expect(yearCal).to.include(item[keys[0]]);
		});
	});

	it("Should return an array of Data for LAST 30 days Filter", async () => {
		const filterOps = {
			timeFilter: { startDate: fromTime, endDate: new Date() },
			table: "tasks",
			filterBy: "last30days",
			monyrDefault: thisMonth + 1,
			yearDefault: thisYear,
			timeChoiceField: "created_at",
			sumChoiceField: "amount",
			dataFilter: { name: "Dishes" }
		};

		const graph = await pipeline.amountTimeGraphPlot(filterOps);

		expect(graph).to.be.an("array");
		expect(graph.length).to.be.equal(2);
		expect(graph[0]).to.be.an("array");

		graph[0].forEach((item: Record<string, any>) => {
			const keys = Object.keys(item);

			expect(item).to.be.an("object");
			expect(keys[0]).to.be.equals("x_axis");
			expect(keys[1]).to.be.equals("y_axis");
			expect(item[keys[0]]).to.be.a("string");
			expect(item[keys[1]]).to.be.a("number");
		});
	});

	it("Should return an array of Data for THIS WEEK days Filter", async () => {
		const filterOps = {
			timeFilter: { startDate: fromTime, endDate: new Date() },
			table: "tasks",
			filterBy: "thisWeek",
			monyrDefault: thisMonth + 1,
			yearDefault: thisYear,
			timeChoiceField: "created_at",
			sumChoiceField: "amount",
			dataFilter: { name: "Dishes" }
		};

		const graph = await pipeline.amountTimeGraphPlot(filterOps);

		expect(graph).to.be.an("array");
		expect(graph.length).to.be.equal(2);
		expect(graph[0]).to.be.an("array");

		const weekCal = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

		graph[0].forEach((item: Record<string, any>) => {
			const keys = Object.keys(item);

			expect(item).to.be.an("object");
			expect(keys[0]).to.be.equals("x_axis");
			expect(keys[1]).to.be.equals("y_axis");
			expect(item[keys[0]]).to.be.a("string");
			expect(item[keys[1]]).to.be.a("number");
			expect(weekCal).to.include(item[keys[0]]);
		});
	});

	it("Should return an array of Data for TODAY days Filter", async () => {
		const filterOps = {
			timeFilter: { startDate: fromTime, endDate: new Date() },
			table: "tasks",
			filterBy: "today",
			monyrDefault: thisMonth + 1,
			yearDefault: thisYear,
			timeChoiceField: "created_at",
			sumChoiceField: "amount",
			dataFilter: { name: "Dishes" }
		};

		const graph = await pipeline.amountTimeGraphPlot(filterOps);

		expect(graph).to.be.an("array");
		expect(graph.length).to.be.equal(2);
		expect(graph[0]).to.be.an("array");

		graph[0].forEach((item: Record<string, any>) => {
			const keys = Object.keys(item);

			expect(item).to.be.an("object");
			expect(keys[0]).to.be.equals("x_axis");
			expect(keys[1]).to.be.equals("y_axis");
			expect(item[keys[0]]).to.be.a("string");
			expect(item[keys[1]]).to.be.a("number");
		});
	});

	it("Should return an array of Data for CUSTOM days Filter", async () => {
		const filterOps = {
			timeFilter: { startDate: fromTime, endDate: new Date() },
			table: "tasks",
			filterBy: "custom",
			monyrDefault: thisMonth + 1,
			yearDefault: thisYear,
			timeChoiceField: "created_at",
			sumChoiceField: "amount",
			dataFilter: { name: "Dishes" }
		};

		const graph = await pipeline.amountTimeGraphPlot(filterOps);

		expect(graph).to.be.an("array");
		expect(graph.length).to.be.equal(2);
		expect(graph[0]).to.be.an("array");

		graph[0].forEach((item: Record<string, any>) => {
			const keys = Object.keys(item);

			expect(item).to.be.an("object");
			expect(keys[0]).to.be.equals("x_axis");
			expect(keys[1]).to.be.equals("y_axis");
			expect(item[keys[0]]).to.be.a("string");
			expect(item[keys[1]]).to.be.a("number");
		});
	});
});

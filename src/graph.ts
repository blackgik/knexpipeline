import { Knex } from "knex";
import { IfilterGraphOps } from "./interfaces";

export const amountTimeGetGraphData = async (
	filterOps: IfilterGraphOps,
	knex: Knex
) => {
	const {
		timeFilter,
		table,
		filterBy,
		timeChoiceField,
		sumChoiceField,
		dataFilter
	} = filterOps;

	let { monyrDefault, yearDefault } = filterOps;

	const thisMonth = new Date().getMonth();
	const thisYear = new Date().getFullYear();

	monyrDefault = monyrDefault ? monyrDefault : thisMonth;
	yearDefault = yearDefault ? yearDefault : thisYear;
	// Convert dynamic filters into SQL conditions
	const filterKeys = Object.keys(dataFilter);
	const whereConditions = filterKeys.length
		? filterKeys.map((key) => `rw.${key} = ?`).join(" AND ")
		: "1=1"; // Default to true if no filters

	const filterValues = Object.values(dataFilter);

	// Time-based X-Axis conditions
	let timeCondition = "";
	let dateValues = [];

	switch (filterBy) {
		case "year":
			timeCondition = `MONTH(rw.${timeChoiceField}) = months.month_num AND YEAR(rw.${timeChoiceField}) = ?`;
			dateValues.push(yearDefault);
			break;

		case "month":
			timeCondition = `
                WEEK(rw.${timeChoiceField}, 1) - WEEK(DATE_FORMAT(?, '%Y-%m-01'), 1) + 1 = weeks.week_num 
                AND MONTH(rw.${timeChoiceField}) = ? AND YEAR(rw.${timeChoiceField}) = ?`;
			dateValues.push(
				`${yearDefault}-${monyrDefault}-01`,
				monyrDefault,
				yearDefault
			);
			break;

		case "last30days":
			timeCondition = `DATE(rw.${timeChoiceField}) = days.day_date`;
			break;

		case "thisWeek":
			timeCondition = `DATE(rw.${timeChoiceField}) = days.day_date`;
			break;

		case "today":
			timeCondition = `HOUR(rw.${timeChoiceField}) = hours.hour_num AND DATE(rw.${timeChoiceField}) = CURDATE()`;
			break;

		case "custom":
			const { startDate, endDate } = timeFilter;
			timeCondition = `DATE(rw.${timeChoiceField}) = days.day_date `;
			dateValues.push(startDate, endDate);
			break;

		default:
			throw new Error("Invalid filter type");
	}

	// Define Recursive Table and Query Based on Type
	let recursiveCTE = "";
	let groupingColumn = "";
	let formatColumn = "";
	let fromSelection = "";

	switch (filterBy) {
		case "year":
			recursiveCTE =
				"WITH RECURSIVE months AS (SELECT 1 AS month_num UNION ALL SELECT month_num + 1 FROM months WHERE month_num < 12)";
			groupingColumn = "months.month_num";
			formatColumn = "months.month_num";
			fromSelection = "months";
			break;

		case "month":
			recursiveCTE =
				"WITH RECURSIVE weeks AS (SELECT 1 AS week_num UNION ALL SELECT week_num + 1 FROM weeks WHERE week_num < 5)";
			groupingColumn = "weeks.week_num";
			formatColumn = `CONCAT('Week-', weeks.week_num)`;
			fromSelection = "weeks";
			break;

		case "last30days":
			recursiveCTE =
				"WITH RECURSIVE days AS (SELECT CURDATE() - INTERVAL 29 DAY AS day_date UNION ALL SELECT day_date + INTERVAL 1 DAY FROM days WHERE day_date < CURDATE())";
			groupingColumn = "days.day_date";
			formatColumn = "DATE_FORMAT(days.day_date, '%a(%b%d)')";
			fromSelection = "days";
			break;

		case "thisWeek":
			recursiveCTE =
				"WITH RECURSIVE days AS (SELECT DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) AS day_date UNION ALL SELECT day_date + INTERVAL 1 DAY FROM days WHERE day_date < CURDATE())";
			groupingColumn = "days.day_date";
			formatColumn = "DATE_FORMAT(days.day_date, '%a')";
			fromSelection = "days";
			break;

		case "today":
			recursiveCTE =
				"WITH RECURSIVE hours AS (SELECT 0 AS hour_num UNION ALL SELECT hour_num + 1 FROM hours WHERE hour_num < 23)";
			groupingColumn = "hours.hour_num";
			formatColumn = "DATE_FORMAT(SEC_TO_TIME(hours.hour_num * 3600), '%l%p')";
			fromSelection = "hours";
			break;

		case "custom":
			recursiveCTE =
				"WITH RECURSIVE days AS (SELECT CAST(? AS DATE) AS day_date UNION ALL SELECT day_date + INTERVAL 1 DAY FROM days WHERE day_date < CAST(? AS DATE))";
			groupingColumn = "days.day_date";
			formatColumn = "DATE_FORMAT(days.day_date, '%a(%b%d)')";
			fromSelection = "days";
			break;
	}

	// Build the final query
	const sqlQuery = `
        ${recursiveCTE}
        SELECT 
            ${formatColumn} AS x_axis,
            COALESCE(SUM(rw.${sumChoiceField}), 0) AS y_axis
        FROM ${fromSelection}
        LEFT JOIN ${table} rw 
        ON ${timeCondition} 
        AND ${whereConditions}
        GROUP BY ${groupingColumn}
        ORDER BY ${groupingColumn};
    `;

	const graph = await knex.raw(sqlQuery, [...dateValues, ...filterValues]);

	if (filterBy === "year") {
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

		graph[0] = graph[0].map((item: Record<string, any>) => {
			item["x_axis"] = yearCal[item["x_axis"] - 1];

			return item;
		});
	}

	return graph;
};

# Pipeline Package

## Overview

The **Pipeline** package is a flexible and efficient database interaction
utility built using **Knex.js**. It abstracts database operations such as
**counting, querying, inserting, updating, and joining tables** into simple,
reusable functions.

## Features

- **Count** records in a database table with filtering options.
- **Find** multiple records with optional pagination.
- **FindOne** retrieves a single record based on filters.
- **Insert** one or multiple records into a database table.
- **Populate** performs complex table joins with filtering and pagination.
- **Update** records based on specified conditions.

## Installation

```sh
npm install knex-pipeline
```

## Usage

```typescript
import { Knex } from "knex";
import { Pipeline } from "knexPipeline";

const db: Knex = knex({
	client: "mysql",
	connection: {
		/* database connection details */
	}
});

const pipeline = new Pipeline(db, "mysql");
```

## Methods

### count

Counts the number of records in a table based on filter criteria.

```typescript
const count = await pipeline.count(filterWith,table,filterWithout?)

##Example
const count = await pipeline.count(
  { status: "active" },
  "users"
);
```

### find

Finds multiple records with optional pagination.

```typescript

const results = await pipeline.find(options: IfilterFind, needsPagination: boolean)

// EXAMPLE

const results = await pipeline.find(
	{
		filterWith: { role: "admin" },
		searchkeys: ["name", "email"],
		searchWord: "john",
		table: "users",
		orderBy: { order: "asc", col: "name" },
		limit: 10,
		offset: 0
	},
	true
);
```

### findOne

Finds a single record based on filter criteria.

```typescript
const user = await pipeline.findOne(
		filterWith: Record<string, any>[] | Record<string, any>,
		table: string,
		col?: string[],
		filterWithout?: Record<string, any> | Record<string, any>[]
	)

// EXAMPLE

const user = await pipeline.findOne({ id: 1 }, "users", ["name", "email"]);
```

### insert

Inserts one or multiple records into a database table.

```typescript

await pipeline.insert(
		data: Record<string, any> | Record<string, any>[],
		table: string
	)

// EXAMPLE

await pipeline.insert({ name: "John Doe", email: "john@example.com" }, "users");
```

### populate

Fetches related data from multiple tables with filtering, pagination, and
aggregation.

```typescript

const results = await pipeline.populate(options: IfilterPopulate, needsPagination: boolean)

// EXAMPLE

const results = await pipeline.populate(
	{
		filterWith: { status: "active" },
		searchkeys: ["name"],
		searchWord: "John",
		tableNames: ["users", "profiles"],
		cols: ["users.name", "profiles.age"],
		orderBy: { order: "desc", col: "users.created_at" },
		foreignKeys: [
			{ joinTable: "profiles", foreignKey: "user_id", localKey: "id" }
		]
	},
	true
);
```

### update

Updates records based on filtering conditions.

```typescript

await pipeline.update(
		data: Record<string, any> | Record<string, any>[],
		filterWith: Record<string, any>,
		table: string
	)

// EXAMPLE

await pipeline.update({ status: "inactive" }, { id: 1 }, "users");
```

### Amount/Time Graph Plot

Plots graphs for the summation of a fields againt time ususally created_at but
you can choose the field time you have defined your column with

```typescript
const graph =  await pipeline.amountTimeGraphPlot(options: IfilterGraphOps)

// EXAMPLE

const fromTime = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60);
const thisMonth = new Date().getMonth();
const thisYear = new Date().getFullYear();

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

// filterOps - see table below
```

### Delete

Finds a single record based on filter criteria.

```typescript
const user = await pipeline.deleleItem(
		filterWith: Record<string, any>[] | Record<string, any>,
		table: string,
		filterWithout?: Record<string, any> | Record<string, any>[]
	)

// EXAMPLE

const user = await pipeline.deleleItem({ id: 1 }, "users", {});
```

## Parameter Details

### IfilterFind

| Parameter     | Type                                               | Description                                          |
| ------------- | -------------------------------------------------- | ---------------------------------------------------- |
| filterWith    | Record<string, any> \| Record<string, any>[]       | Conditions to filter records                         |
| searchkeys    | string[]                                           | Keys to search                                       |
| searchWord    | string?                                            | Search term (optional)                               |
| table         | string                                             | Target table name                                    |
| cols          | string[]?                                          | Columns to retrieve (optional)                       |
| orderBy       | { order: string; col: string }                     | Sorting order and column                             |
| offset        | number?                                            | Pagination offset (optional)                         |
| limit         | number?                                            | Pagination limit (optional)                          |
| filterWithout | Record<string, any> \| Record<string, any>[]?      | Exclude records matching these conditions (optional) |
| timeFilters   | { key: string; fromTime: Date; toTime: Date }?     | Filter by time range (optional)                      |
| aggregations  | { aggType: string; col: string; alias: string }[]? | Aggregation queries (optional)                       |

### IfilterPopulate

| Parameter     | Type                                                           | Description                                          |
| ------------- | -------------------------------------------------------------- | ---------------------------------------------------- |
| filterWith    | Record<string, any> \| Record<string, any>[]                   | Conditions to filter records                         |
| searchkeys    | string[]                                                       | Keys to search                                       |
| searchWord    | string                                                         | Search term                                          |
| tableNames    | string[]                                                       | Tables to join                                       |
| cols          | string[]                                                       | Columns to retrieve                                  |
| orderBy       | { order: string; col: string }                                 | Sorting order and column                             |
| offset        | number?                                                        | Pagination offset (optional)                         |
| limit         | number?                                                        | Pagination limit (optional)                          |
| filterWithout | Record<string, any> \| Record<string, any>[]?                  | Exclude records matching these conditions (optional) |
| groupBy       | string[]?                                                      | Grouping conditions (optional)                       |
| foreignKeys   | { joinTable: string; foreignKey: string; localKey: string }[]? | Table relationships                                  |
| timeFilters   | { key: string; fromTime: Date; toTime: Date }?                 | Filter by time range (optional)                      |
| aggregations  | { aggType: string; col: string; alias: string }[]?             | Aggregation queries (optional)                       |
| filterRaw     | string[]?                                                      | Raw SQL filters (optional)                           |

#### Parameters:

| Parameter         | Type                                 | Description                                                                                         |
| ----------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `timeFilter`      | `{ startDate: Date; endDate: Date }` | The time range for filtering data.                                                                  |
| `table`           | `string`                             | The name of the table to query.                                                                     |
| `filterBy`        | `string`                             | The time grouping type (`year`, `month`, `last30Days`, `thisWeek`, `today`, `custom`, `lastMonth`). |
| `monyrDefault`    | `number`                             | Default month-year value for filtering.                                                             |
| `yearDefault`     | `number`                             | Default year value for filtering.                                                                   |
| `timeChoiceField` | `string`                             | The database field used for time-based grouping.                                                    |
| `sumChoiceField`  | `string`                             | The field whose values will be summed for graph plotting.                                           |
| `dataFilter`      | `Record<string, any>`                | Additional filter conditions for the query.                                                         |

## License

This package is open-source and available under the [MIT License](LICENSE).

## Contributions

Currently, Knex-Pipeline supports only MySQL, but in the coming months, support
for other SQL databases will be added. Contributions are welcome! Fork the
repository and submit your pull requests.

Fork the repo from [GITHUB](https://github.com/blackgik/knexpipeline/)

## Author

Developed by **Chinedum Echendu**

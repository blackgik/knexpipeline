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

const pipeline = new Pipeline(db, "user_module");
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

## Example
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

## Example
const user = await pipeline.findOne({ id: 1 }, "users", ["name", "email"]);
```

### insert

Inserts one or multiple records into a database table.

```typescript

await pipeline.insert(
		data: Record<string, any> | Record<string, any>[],
		table: string
	)

## Example
await pipeline.insert({ name: "John Doe", email: "john@example.com" }, "users");
```

### populate

Fetches related data from multiple tables with filtering, pagination, and
aggregation.

```typescript

const results = await pipeline.populate(options: IfilterPopulate, needsPagination: boolean)

## Example
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

## Example 
await pipeline.update({ status: "inactive" }, { id: 1 }, "users");
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

## License

This package is open-source and available under the [MIT License](LICENSE).

## Contributions

Contributions are welcome! Please open an issue or submit a pull request.
Fork the repo from [GITHUB:](https://github.com/blackgik/knexpipeline/)

## Author

Developed by **Chinedum Echendu**

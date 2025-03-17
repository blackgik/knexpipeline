# Knex-Pipeline

## Description
Knex-Pipeline is a powerful abstraction over MySQL using Knex.js. It simplifies database interactions, making it easy to perform CRUD operations, filtering, aggregations, and more without requiring deep knowledge of SQL.

## Installation
```sh
yarn add knex-pipeline
```

## Usage
```typescript
import { Pipeline } from 'knex-pipeline';
const pipeline = new Pipeline(knexConnection, 'your_module');
```

## Functions

### `amountTimeGraphPlot`
Plots data over time based on different time groupings.
```typescript
async amountTimeGraphPlot(options: IfilterGraphOps)
```
#### Parameters:
| Parameter         | Type                              | Description |
|------------------|--------------------------------|-------------|
| `timeFilter`     | `{ startDate: Date; endDate: Date }` | The time range for filtering data. |
| `table`         | `string`                        | The name of the table to query. |
| `filterBy`      | `string`                        | The time grouping type (`year`, `month`, `last30Days`, `thisWeek`, `today`, `custom`, `lastMonth`). |
| `monyrDefault`  | `number`                        | Default month-year value for filtering. |
| `yearDefault`   | `number`                        | Default year value for filtering. |
| `timeChoiceField` | `string`                      | The database field used for time-based grouping. |
| `sumChoiceField` | `string`                      | The field whose values will be summed for graph plotting. |
| `dataFilter`    | `Record<string, any>`          | Additional filter conditions for the query. |

### `deleleitem`
Deletes records from the database based on filtering conditions.
```typescript
async deleleitem(
  filterWith: Record<string, any>[] | Record<string, any>,
  table: string,
  filterWithout?: Record<string, any> | Record<string, any>[]
)
```
#### Parameters:
- `filterWith`: The conditions to match records for deletion.
- `table`: The table from which records will be deleted.
- `filterWithout` (optional): Conditions to exclude certain records from deletion.

## Contributions
Currently, Knex-Pipeline supports only MySQL, but in the coming months, support for other SQL databases will be added. Contributions are welcome! Fork the repository and submit your pull requests.

[GitHub Repo](https://github.com/blackgik/knexpipeline)

## License
MIT


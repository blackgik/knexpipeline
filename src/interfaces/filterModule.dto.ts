export interface IfilterFind {
	filterWith: Record<string, any> | Record<string, any>[];
	searchkeys: string[];
	searchWord?: string;
	table: string;
	cols?: string[];
	orderBy: { order: string; col: string };
	offset?: number;
	limit?: number;
	filterWithout?: Record<string, any> | Record<string, any>[];
	timeFilters?: { key: string; fromTime: Date; toTime: Date };
	aggregations?: { aggType: string; col: string; alias: string }[];
}

export interface IfilterPopulate {
	filterWith: Record<string, any> | Record<string, any>[];
	searchkeys: string[];
	searchWord: string;
	tableNames: string[];
	cols: string[];
	orderBy: { order: string; col: string };
	offset?: number;
	limit?: number;
	filterWithout?: Record<string, any> | Record<string, any>[];
	groupBy?: string[];
	foreignKeys?: { joinTable: string; foreignKey: string; localKey: string }[];
	timeFilters: { key: string; fromTime: Date; toTime: Date } | null;
	aggregations?: { aggType: string; col: string; alias: string }[];
	filterRaw?: string[] | null;
}

export interface IfilterGraphOps {
	timeFilter: { startDate: Date; endDate: Date };
	table: string;
	filterBy: string; // year, month, last30Days, thisWeek, today, custom, lastMonth - type
	monyrDefault: number;
	yearDefault: number;
	timeChoiceField: string;
	sumChoiceField: string;
	dataFilter: Record<string, any>;
}

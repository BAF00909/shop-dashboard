export interface IPagination {
	skip: number;
	take: number;
	page: number;
	filter?: Array<{property: string, value: any}>;
	sortBy?: {property: string, value: 'asc' | 'deck'};
	pageCount: number
}
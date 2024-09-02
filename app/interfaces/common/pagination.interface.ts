export interface IPagination {
	skip: number;
	take: number;
	page: number;
	filterQuery?: Array<{property: string, value: any}>;
	sortBy?: {property: string, value: 'asc' | 'deck'};
	pageCount: number
}
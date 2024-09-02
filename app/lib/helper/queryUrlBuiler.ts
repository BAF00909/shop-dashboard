export const urlBuilder = (skip: number, take: number, filterQuery?: Array<Record<string, any>>) => {
	return `?skip=${skip}&take=${take}${filterQuery?.length ? '&' + filterQuery.map((item, index) => {
		return `filter[${index}][property]=${encodeURIComponent(item.property)}&filter[${index}][value]=${encodeURIComponent(item.value)}`
	}).join('&') : ""}`
}

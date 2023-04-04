export type ListParams = Record<string, any>

export interface ListDto<T> {
	total: number
	results: T[]
}

import { ListParams } from '../../dto/common'

interface PaginationProps {
	page: number
	limit: number
	offset: number
}

export function resolvePagination(params: ListParams): PaginationProps {
	const limit = 2
	const page = Number(params.page ?? 1)
	const offset = limit * (page - 1)

	return { page, limit, offset }
}

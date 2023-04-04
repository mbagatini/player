import { prisma } from '../../database/prisma'
import { ListDto, ListParams } from '../../dto/common'
import { SongCreationProps, Song } from '../../dto/song'
import { SongRepository } from '../song-repository'
import { resolvePagination } from '../utils/resolvePagination'

export class PrismaSongRepository implements SongRepository {
	async create(data: SongCreationProps): Promise<Song> {
		const song = await prisma.song.create({
			data: {
				...data,
				author: {
					connectOrCreate: {
						where: {
							name: data.author,
						},
						create: {
							name: data.author,
						},
					},
				},
			},
		})

		return song
	}

	async findByTitleAndAuthor(
		title: string,
		author: string,
	): Promise<Song | undefined> {
		const song = await prisma.song.findFirst({
			where: {
				title,
				author: {
					name: author,
				},
			},
		})

		return song || undefined
	}

	async searchMany(params: ListParams): Promise<ListDto<Song>> {
		const pagination = resolvePagination(params)

		const { title, author, keywords, releaseDate } = params

		const whereClause: any = {}

		if (title) whereClause.title = { contains: title, mode: 'insensitive' }
		if (author)
			whereClause.author = { name: { contains: author, mode: 'insensitive' } }
		if (keywords)
			whereClause.keywords = {
				hasSome: keywords,
			}
		if (releaseDate) whereClause.releaseDate = { equals: new Date(releaseDate) }

		const count = await prisma.song.count({
			where: whereClause,
		})

		const songs = await prisma.song.findMany({
			where: whereClause,
			include: { author: true },
			take: pagination.limit,
			skip: pagination.offset,
		})

		return {
			total: count,
			results: songs,
		}
	}
}

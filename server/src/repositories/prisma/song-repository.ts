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

	async update(id: number, data: Partial<SongCreationProps>): Promise<Song> {
		const updateData: any = {
			...data,
		}

		if (data.author) {
			updateData.author = {
				connectOrCreate: {
					where: {
						name: data.author,
					},
					create: {
						name: data.author,
					},
				},
			}
		}

		return await prisma.song.update({
			where: { id },
			data: updateData,
		})
	}

	async delete(id: number): Promise<void> {
		await prisma.song.delete({ where: { id } })
	}

	async findById(id: number): Promise<Song | undefined> {
		return (await prisma.song.findUnique({ where: { id } })) || undefined
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

		const filters: any[] = []

		if (title) filters.push({ title: { contains: title, mode: 'insensitive' } })

		if (author)
			filters.push({
				author: { name: { contains: author, mode: 'insensitive' } },
			})

		if (releaseDate)
			filters.push({ releaseDate: { equals: new Date(releaseDate) } })

		if (keywords)
			filters.push({
				keywords: {
					hasSome: keywords,
				},
			})

		const whereConditions = filters.length ? { OR: filters } : {}

		const count = await prisma.song.count({
			where: whereConditions,
		})

		const songs = await prisma.song.findMany({
			where: whereConditions,
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

import { prisma } from '../../database/prisma'
import { SongCreationProps, Song } from '../../dto/song'
import { SongRepository } from '../song-repository'

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
}

import { Song } from '../dto/song'
import { AlreadyExistsError } from '../errors/AlreadyExistsError'
import { SongRepository } from '../repositories/song-repository'

interface RegisterSongUseCaseRequest {
	title: string
	releaseDate: Date
	keywords: string[]
	author: string
}

interface RegisterSongUseCaseResponse {
	song: Song
}

export class RegisterSongUseCase {
	constructor(private songRepository: SongRepository) {}

	async execute(
		data: RegisterSongUseCaseRequest,
	): Promise<RegisterSongUseCaseResponse> {
		const { title, author, releaseDate, keywords } = data

		const songAlreadyExists = await this.songRepository.findByTitleAndAuthor(
			title,
			author,
		)

		if (songAlreadyExists) {
			throw new AlreadyExistsError('Song already registered')
		}

		const song = await this.songRepository.create({
			title,
			author,
			releaseDate,
			keywords,
		})

		return { song }
	}
}

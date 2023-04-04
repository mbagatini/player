import { NotFoundError } from '../errors/NotFoundError'
import { SongRepository } from '../repositories/song-repository'

interface DeleteSongUseCaseRequest {
	id: number
}

type DeleteSongUseCaseResponse = void

export class DeleteSongUseCase {
	constructor(private songRepository: SongRepository) {}

	async execute({
		id,
	}: DeleteSongUseCaseRequest): Promise<DeleteSongUseCaseResponse> {
		const song = await this.songRepository.findById(id)

		if (!song) {
			throw new NotFoundError('Song not found')
		}

		await this.songRepository.delete(id)
	}
}

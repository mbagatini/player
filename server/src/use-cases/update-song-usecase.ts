import { Song, SongCreationProps } from '../dto/song'
import { NotFoundError } from '../errors/NotFoundError'
import { SongRepository } from '../repositories/song-repository'

interface UpdateSongUseCaseRequest {
	id: number
	data: Partial<SongCreationProps>
}

interface RegisterSongUseCaseResponse {
	song: Song
}

export class UpdateSongUseCase {
	constructor(private songRepository: SongRepository) {}

	async execute({
		id,
		data,
	}: UpdateSongUseCaseRequest): Promise<RegisterSongUseCaseResponse> {
		const song = await this.songRepository.findById(id)

		if (!song) {
			throw new NotFoundError('Song not found')
		}

		const updatedSong = await this.songRepository.update(id, data)

		return { song: updatedSong }
	}
}

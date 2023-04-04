import { ListParams, ListDto } from './../dto/common'
import { Song } from '../dto/song'
import { SongRepository } from '../repositories/song-repository'

export class ListSongsUseCase {
	constructor(private songRepository: SongRepository) {}

	async execute(params: ListParams): Promise<ListDto<Song>> {
		return await this.songRepository.searchMany(params)
	}
}

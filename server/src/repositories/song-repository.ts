import { ListParams, ListDto } from '../dto/common'
import { Song, SongCreationProps } from '../dto/song'

export interface SongRepository {
	create(data: SongCreationProps): Promise<Song>
	update(id: number, data: Partial<SongCreationProps>): Promise<Song>
	findById(id: number): Promise<Song | undefined>
	findByTitleAndAuthor(title: string, author: string): Promise<Song | undefined>
	searchMany(params: ListParams): Promise<ListDto<Song>>
}

import { Song, SongCreationProps } from '../dto/song'

export interface SongRepository {
	create(data: SongCreationProps): Promise<Song>
	findByTitleAndAuthor(title: string, author: string): Promise<Song | undefined>
}

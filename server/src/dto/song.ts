import { Author } from './author'

export type SongCreationProps = {
	title: string
	releaseDate: Date
	keywords: string[]
	author: string
}

export type Song = {
	id: string
	title: string
	releaseDate: Date
	keywords: string[]
	authorId: string
	author?: Author
}

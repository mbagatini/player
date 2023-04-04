import { Author } from './author'

export type SongCreationProps = {
	title: string
	releaseDate: Date
	keywords: string[]
	author: string
}

export type Song = {
	id: number
	title: string
	releaseDate: Date
	keywords: string[]
	authorId: number
	author?: Author
}

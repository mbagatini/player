import { Author } from './author'

export type Song = {
    id: number
    title: string
    releaseDate: Date
    keywords: string[]
    authorId: number
    author: Author
}

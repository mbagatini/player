import { z } from 'zod'
import { Request, Response } from 'express'
import { PrismaSongRepository } from '../../repositories/prisma/song-repository'
import { RegisterSongUseCase } from '../../use-cases/register-song-usecase'

export async function registerSong(request: Request, response: Response) {
	const songBody = z.object({
		title: z.string({
			required_error: 'Title is required',
		}),
		releaseDate: z.coerce.date({
			required_error: 'Release date is required',
		}),
		author: z.string({
			required_error: 'Author is required',
		}),
		keywords: z.string().array().optional(),
	})

	const { title, releaseDate, author, keywords } = songBody.parse(request.body)

	const prismaRepository = new PrismaSongRepository()
	const registerUseCase = new RegisterSongUseCase(prismaRepository)

	await registerUseCase.execute({
		title,
		releaseDate,
		author,
		keywords: keywords as [],
	})

	response.status(201).send()
}

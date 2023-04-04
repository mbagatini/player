import { z } from 'zod'
import { Request, Response } from 'express'
import { PrismaSongRepository } from '../../repositories/prisma/song-repository'
import { UpdateSongUseCase } from '../../use-cases/update-song-usecase'

export async function updateSong(request: Request, response: Response) {
	const routeParams = z.object({
		id: z.coerce.number(),
	})

	const songBody = z.object({
		title: z.string().min(1).optional(),
		releaseDate: z.coerce.date().optional(),
		author: z.string().min(1).optional(),
		keywords: z.string().array().optional(),
	})

	const { id } = routeParams.parse(request.params)
	const data = songBody.parse(request.body)

	const prismaRepository = new PrismaSongRepository()
	const updateUseCase = new UpdateSongUseCase(prismaRepository)

	await updateUseCase.execute({
		id,
		data,
	})

	response.status(204).send()
}

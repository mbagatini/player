import { z } from 'zod'
import { Request, Response } from 'express'
import { PrismaSongRepository } from '../../repositories/prisma/song-repository'
import { DeleteSongUseCase } from '../../use-cases/delete-song-usecase'

export async function deleteSong(request: Request, response: Response) {
	const routeParams = z.object({
		id: z.coerce.number(),
	})

	const { id } = routeParams.parse(request.params)

	const prismaRepository = new PrismaSongRepository()
	const deleteUseCase = new DeleteSongUseCase(prismaRepository)

	await deleteUseCase.execute({
		id,
	})

	response.status(204).send()
}

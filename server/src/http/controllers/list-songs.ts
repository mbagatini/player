import { Request, Response } from 'express'
import { ListSongsUseCase } from '../../use-cases/list-songs-usecase'
import { PrismaSongRepository } from '../../repositories/prisma/song-repository'

export async function listSongs(request: Request, response: Response) {
	const query = request.query || {}

	const prismaRepository = new PrismaSongRepository()
	const listSongsUseCase = new ListSongsUseCase(prismaRepository)

	const result = await listSongsUseCase.execute(query)

	response.status(200).send(result)
}

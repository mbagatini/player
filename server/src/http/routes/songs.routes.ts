import { Router } from 'express'
import { registerSong } from '../controllers/register-song'

export const songsRoutes = Router()

songsRoutes.post('/', async (req, res, next) => {
	try {
		await registerSong(req, res)
	} catch (error) {
		next(error)
	}
})

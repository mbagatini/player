import { Router } from 'express'
import { songsRoutes } from './songs.routes'

export const appRoutes = Router()

appRoutes.use('/songs', songsRoutes)

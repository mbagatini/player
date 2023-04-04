import express from 'express'
import { appRoutes } from './http/routes'
import { env } from './env'
import { errorHandler } from './http/utils/errorHandler'

const app = express()

app.use(express.json())

app.use(appRoutes)
app.use(errorHandler)

app.listen(env.PORT, () => {
	console.log(`✅ server listening on port ${env.PORT}`)
})

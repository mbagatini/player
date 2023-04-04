import express from 'express'
import { env } from './env'

const app = express()

app.use(express.json())


app.listen(env.PORT, () => {
	console.log(`✅ server listening on port ${env.PORT}`)
})

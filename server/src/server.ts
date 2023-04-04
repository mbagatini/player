import express from 'express'

const app = express()

app.use(express.json())


app.listen(env.PORT, () => {
	console.log(`✅ server listening on port ${env.PORT}`)
})

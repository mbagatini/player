import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { AlreadyExistsError } from '../../errors/AlreadyExistsError'

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (err instanceof AlreadyExistsError) {
		return res.status(400).send({ message: err.message })
	}

	if (err instanceof ZodError) {
		return res.status(400).send({ errors: err.flatten().fieldErrors })
	}

	res.status(500).send({ message: 'Internal Server Error' })
}

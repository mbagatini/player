import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { AlreadyExistsError } from '../../errors/AlreadyExistsError'
import { NotFoundError } from '../../errors/NotFoundError'

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (err instanceof AlreadyExistsError) {
		return res.status(400).send({ message: err.message })
	}

	if (err instanceof NotFoundError) {
		return res.status(404).send({ message: err.message })
	}

	if (err instanceof ZodError) {
		return res.status(400).send({ errors: err.flatten().fieldErrors })
	}

	res.status(500).send({ message: 'Internal Server Error' })
}

import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/bad-request-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  console.error(err);
  res.status(500).send({
    message: 'Something went wrong',
  });
};

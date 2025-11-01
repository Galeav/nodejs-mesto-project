import {
  Request, Response, NextFunction, ErrorRequestHandler,
} from 'express';

import HTTP_STATUS from '../utils/http-status';
import CustomError from '../errors/custom-error';

/* eslint-disable no-unused-vars */
const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
};

export default errorHandler;

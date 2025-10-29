import { Response, NextFunction, ErrorRequestHandler } from 'express';

import { UserRequest } from '../types/user-request';
import HTTP_STATUS from '../utils/http-status';

/* eslint-disable no-unused-vars */
const errorHandler: ErrorRequestHandler = (
  err,
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  if (err?.name === 'ValidationError' || err?.name === 'CastError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
};

export default errorHandler;

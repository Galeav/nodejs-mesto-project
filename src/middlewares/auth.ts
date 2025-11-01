import type {
  Request, NextFunction, RequestHandler, Response,
} from 'express';

import { UserRequest } from '../types/user-request';
import { verifyToken } from '../utils/jwt';
import UnauthorizedError from '../errors/unauthorized';

const auth: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError());
  }

  const token = authorization.replace('Bearer ', '');
  try {
    (req as UserRequest).user = verifyToken(token);
  } catch (err) {
    return next(new UnauthorizedError('Токен некорректен или устарел'));
  }

  return next();
};

export default auth;

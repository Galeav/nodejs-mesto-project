import jwt from 'jsonwebtoken';

import config from '../config';
import { AuthUser } from '../types/user-request';

export function generateToken(payload: jwt.JwtPayload): string {
  return jwt.sign(
    payload,
    config.jwtSecret,
    { expiresIn: 1000 * 60 * 60 * 24 * config.jwtExpiresInDays },
  );
}

export function verifyToken(token: string): AuthUser {
  return jwt.verify(token, config.jwtSecret) as AuthUser;
}

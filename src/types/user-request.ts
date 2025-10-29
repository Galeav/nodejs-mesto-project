import type { Request } from 'express';

export type AuthUser = { _id: string };

export type UserRequest = Request & { user?: AuthUser };

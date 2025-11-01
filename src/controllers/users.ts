import { Request, Response, NextFunction } from 'express';

import User from '../models/user';
import { UserRequest } from '../types/user-request';
import HTTP_STATUS from '../utils/http-status';
import { generateToken } from '../utils/jwt';
import { comparePassword, hashPassword } from '../utils/security';
import ConflictError from '../errors/conflict';
import NotFoundError from '../errors/not-found';
import UnauthorizedError from '../errors/unauthorized';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      email,
      password,
      name,
      about,
      avatar,
    } = req.body;

    const hash = await hashPassword(password);

    const user = await User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    });

    const { password: pwd, ...userResponse } = user.toObject();

    return res.status(HTTP_STATUS.CREATED).send(
      userResponse,
    );
  } catch (err) {
    if (err != null && typeof err === 'object' && 'code' in err && err.code === 11000) {
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }
    return next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new UnauthorizedError('Неверный email или пароль'));
    }

    const verified = await comparePassword(password, user.password);
    if (!verified) {
      return next(new UnauthorizedError('Неверный email или пароль'));
    }

    const token = generateToken({ _id: user._id.toString() });
    return res.send({ token });
  } catch (err) {
    return next(err);
  }
}

/* eslint-disable no-unused-vars */
export async function getUsers(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return next(err);
  }
}

export async function getUserById(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError('Запрашиваемый пользователь не найден'));
    }

    return res.send(user);
  } catch (err) {
    return next(err);
  }
}

export async function getUserInfo(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?._id;

    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError('Запрашиваемый пользователь не найден'));
    }

    return res.send(user);
  } catch (err) {
    return next(err);
  }
}

export async function updateUserInfo(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?._id;
    const { name, about } = req.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!updated) return next(new NotFoundError('Пользователь не найден'));
    return res.send(updated);
  } catch (err) {
    return next(err);
  }
}

export async function updateUserAvatar(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?._id;
    const { avatar } = req.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!updated) return next(new NotFoundError('Пользователь не найден'));
    return res.send(updated);
  } catch (err) {
    return next(err);
  }
}

import { Response, NextFunction } from 'express';

import User from '../models/user';
import { UserRequest } from '../types/user-request';
import HTTP_STATUS from '../utils/http-status';

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
      return res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
    }

    return res.send(user);
  } catch (err) {
    return next(err);
  }
}

export async function createUser(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const { name, about, avatar } = req.body;

    const user = await User.create({ name, about, avatar });
    return res.status(HTTP_STATUS.CREATED).send(user);
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
    if (!updated) return res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Пользователь не найден' });
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
    if (!updated) return res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Пользователь не найден' });
    return res.send(updated);
  } catch (err) {
    return next(err);
  }
}

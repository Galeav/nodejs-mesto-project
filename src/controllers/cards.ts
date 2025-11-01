import { Response, NextFunction } from 'express';

import Card from '../models/card';
import { UserRequest } from '../types/user-request';
import HTTP_STATUS from '../utils/http-status';
import NotFoundError from '../errors/not-found';
import ForbiddenError from '../errors/forbidden';

/* eslint-disable no-unused-vars */
export async function getCards(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return next(err);
  }
}

export async function createCard(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?._id;
    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner: userId });
    return res.status(HTTP_STATUS.CREATED).send(card);
  } catch (err) {
    return next(err);
  }
}

export async function deleteCard(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?._id;
    const { cardId } = req.params;

    const card = await Card.findById(cardId);
    if (!card) {
      return next(new NotFoundError('Запрашиваемая карточка не найдена'));
    }

    if (card.owner._id.toString() !== userId) {
      return next(new ForbiddenError('Вы не владелец запрашиваемой карточки'));
    }
    await card.deleteOne();
    return res.send(card);
  } catch (err) {
    return next(err);
  }
}

export async function likeCard(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?._id;
    const { cardId } = req.params;

    const updated = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );

    if (!updated) {
      return next(new NotFoundError('Запрашиваемая карточка не найдена'));
    }

    return res.send(updated);
  } catch (err) {
    return next(err);
  }
}

export async function dislikeCard(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?._id;
    const { cardId } = req.params;

    const updated = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );

    if (!updated) {
      return next(new NotFoundError('Запрашиваемая карточка не найдена'));
    }

    return res.send(updated);
  } catch (err) {
    return next(err);
  }
}

import { Response, NextFunction } from 'express';

import Card from '../models/card';
import { UserRequest } from '../types/user-request';
import HTTP_STATUS from '../utils/http-status';

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
      return res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
    }

    if (!userId || card.owner._id.toString() !== userId) {
      return res.status(HTTP_STATUS.FORBIDDEN).send({ message: 'Вы не владелец запрашиваемой карточки' });
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
      return res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
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
      return res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
    }

    return res.send(updated);
  } catch (err) {
    return next(err);
  }
}

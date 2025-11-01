import { celebrate, Joi, Segments } from 'celebrate';

import urlRegex from '../utils/regex';

export const validateParamsId = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().hex().length(24),
    userId: Joi.string().hex().length(24),
  }),
});

export const validateSignUp = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(urlRegex),
  }),
});

export const validateSignIn = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validateUpdateUserInfo = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});

export const validateUpdateUserAvatar = celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().required().pattern(urlRegex),
  }),
});

export const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(urlRegex),
  }),
});

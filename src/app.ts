import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { errors } from 'celebrate';

import config from './config';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import errorHandler from './middlewares/error-handler';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';
import { validateSignIn, validateSignUp } from './middlewares/validators';
import requestLogger from './middlewares/request-logger';
import errorLogger from './middlewares/error-logger';
import NotFoundError from './errors/not-found';

const app = express();

mongoose.connect(config.mongodbUrl, {});

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateSignUp, createUser);
app.post('/signin', validateSignIn, login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

/* eslint-disable no-unused-vars */
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(config.port, () => {});

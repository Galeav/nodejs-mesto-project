import express, { Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import config from './config';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import errorHandler from './middlewares/error-handler';
import { UserRequest } from './types/user-request';
import HTTP_STATUS from './utils/http-status';

const app = express();

mongoose.connect(config.mongodbUrl, {});

app.use(express.json());

/* eslint-disable no-unused-vars */
app.use((req: UserRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '68fe2e49482620d38f6ec945',
  };

  next();
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

/* eslint-disable no-unused-vars */
app.use((req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Запрашиваемая страница не найдена' });
});

app.use(errorHandler);

app.listen(config.port, () => {});

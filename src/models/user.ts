import { Schema, model } from 'mongoose';
import validator from 'validator';
import urlRegex from '../utils/regex';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (val: string) => urlRegex.test(val),
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (val: string) => validator.isEmail(val),
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

export default model<IUser>('user', userSchema);

import { Schema, model } from 'mongoose';
import validator from 'validator';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String, required: true, minlength: 2, maxlength: 30,
    },
    about: {
      type: String, required: true, minlength: 2, maxlength: 200,
    },
    avatar: { type: String, required: true },
  },
  { versionKey: false },
);

userSchema.path('avatar').validate(
  (val: string) => validator.isURL(val, { protocols: ['http', 'https'], require_protocol: true }),
  'Неверно задана ссылка',
);

export default model<IUser>('user', userSchema);

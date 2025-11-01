import { Schema, model, Types } from 'mongoose';

import urlRegex from '../utils/regex';

export interface ICard {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>(
  {
    name: {
      type: String, required: true, minlength: 2, maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (val: string) => urlRegex.test(val),
      },
    },
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'user', default: [] }],
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

export default model<ICard>('card', cardSchema);

import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../../models/IUser';
import { saltRounds } from '../../constants/hash';

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: {
    type: String,
    trim: true,
  },
});

userSchema.pre('save', async function (this: IUser, next) {
  const hash = await bcrypt.hash(this.password, saltRounds);
  this.password = hash;
  return next();
});

userSchema.methods.comparePasswords = async function (
  this: IUser,
  password: string,
) {
  let isMatched = false;
  bcrypt.compare(password, this.password, (err, result) => {
    if (err) {
      throw err;
    }
    isMatched = result;
  });
  return isMatched;
};

export default model<IUser>('User', userSchema);

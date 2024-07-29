import { Document } from 'mongoose';

export interface User extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
}

export type UserPublic = Omit<User, 'password'>;

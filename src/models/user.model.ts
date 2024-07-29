import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/user.interface';

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = model<User & Document>('User', userSchema);

export default UserModel;

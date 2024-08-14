import UserModel from '@models/user.model';
import { User } from '@interfaces/user.interface';
import mongoose from 'mongoose';

class UserService {
  public users = UserModel;

  public getUserByID(id: string): Promise<User> {
    return this.users.findOne({ _id: new mongoose.Types.ObjectId(id) }).select(['-__v']);
  }

  public getUserByUsername(username: string): Promise<User> {
    return this.users.findOne({ username }).select(['-__v']);
  }

  public getUserByEmail(email: string): Promise<User> {
    return this.users.findOne({ email }).select(['-__v']);
  }
}

export default UserService;

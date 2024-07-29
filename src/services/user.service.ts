import UserModel from '@models/user.model';
import { User } from '@interfaces/user.interface';

class UserService {
  public users = UserModel;

  public getUserByUsername(username: string): Promise<User> {
    return this.users.findOne({ username }).select(['-__v']);
  }

  public getUserByEmail(email: string): Promise<User> {
    return this.users.findOne({ email }).select(['-__v']);
  }
}

export default UserService;

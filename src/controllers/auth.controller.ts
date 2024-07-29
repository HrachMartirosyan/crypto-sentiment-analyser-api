import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import UserService from '@services/user.service';
import { BadRequest } from '@exceptions/BadRequest';
import UserModel from '@models/user.model';
import { craftPublicUser } from '@/factories/user.factory';

class AuthController {
  public userService: UserService = new UserService();

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserByUsername(req.body.username.toLowerCase());

      if (!user) {
        throw new BadRequest('Wrong email or password');
      }

      const result = await bcrypt.compare(req.body.password, user.password);

      if (!result) {
        throw new BadRequest('Wrong email or password');
      }

      res.json(craftPublicUser(user));
    } catch (e) {
      next(e);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      const user = new UserModel({
        username: req.body.username.toLowerCase(),
        email: req.body.email,
        password: password,
      });
      await user.save();

      res.json(craftPublicUser(user));
    } catch (e) {
      next(e);
    }
  };
}

export default AuthController;

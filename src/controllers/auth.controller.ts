import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import UserService from '@services/user.service';
import { BadRequest } from '@exceptions/BadRequest';
import UserModel from '@models/user.model';
import { craftPublicUserWithJWT } from '@/factories/user.factory';
import { Conflict } from '@exceptions/Conflict';

class AuthController {
  public userService: UserService = new UserService();

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserByEmail(req.body.email);

      if (!user) {
        throw new BadRequest('Wrong email or password');
      }

      const result = await bcrypt.compare(req.body.password, user.password);

      if (!result) {
        throw new BadRequest('Wrong email or password');
      }

      res.json(craftPublicUserWithJWT(user));
    } catch (e) {
      next(e);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dbUser = await this.userService.getUserByEmail(req.body.email);

      if (dbUser) {
        throw new Conflict('User with that email address already exists!');
      }

      const dbUserWithUsername = await this.userService.getUserByUsername(req.body.username.toLowerCase());
      if (dbUserWithUsername) {
        throw new Conflict('User with that username  already exists!');
      }

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const user = new UserModel({
        username: req.body.username.toLowerCase(),
        email: req.body.email,
        password: password,
      });
      await user.save();

      res.json(craftPublicUserWithJWT(user));
    } catch (e) {
      next(e);
    }
  };
}

export default AuthController;

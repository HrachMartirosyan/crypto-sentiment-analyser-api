import { NextFunction, Response } from 'express';

import UserService from '@services/user.service';
import { craftPublicUser } from '@/factories/user.factory';
import { RequestWithUser } from '@interfaces/routes.interface';
import { BadRequest } from '@exceptions/BadRequest';

class UserController {
  public userService: UserService = new UserService();

  public getUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserByID(req.user._id);

      if (!user) {
        throw new BadRequest('Wrong user credentials!');
      }

      res.json(craftPublicUser(user));
    } catch (e) {
      next(e);
    }
  };
}

export default UserController;

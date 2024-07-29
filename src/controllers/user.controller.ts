import { NextFunction, Request, Response } from 'express';

import UserService from '@services/user.service';

class UserController {
  public userService: UserService = new UserService();

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      console.log('headers123', req.user);
      res.json(null);
    } catch (e) {
      next(e);
    }
  };
}

export default UserController;

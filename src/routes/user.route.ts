import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import UserController from '@controllers/user.controller';
import RequestValidator from '@/validators/request.validator';
import { AuthHeaderDto } from '@/dto/headers.dto';
import { getJWTTokenData } from '@middlewares/jwt.middleware';

class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public controller = new UserController();

  private validator = new RequestValidator();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // @ts-ignore
    this.router.get(`${this.path}`, this.validator.validateHeaders(AuthHeaderDto), getJWTTokenData, this.controller.getUser);
  }
}

export default UserRoute;

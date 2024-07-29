import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import AuthController from '@controllers/auth.controller';
import RequestValidator from '@/validators/request.validator';
import { SignInDto, SignUpDto } from '@/dto/auth.dto';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public controller = new AuthController();

  private validator = new RequestValidator();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/sign-in`, this.validator.validateBody(SignInDto), this.controller.signIn);
    this.router.post(`${this.path}/sign-up`, this.validator.validateBody(SignUpDto), this.controller.signUp);
  }
}

export default AuthRoute;

import { Router, Request } from 'express';

export interface Routes {
  path?: string;
  router: Router;
}

export type JWTPayload = {
  _id: string;
  iat?: number;
  exp?: number;
};

export interface RequestWithUser extends Request {
  user: JWTPayload;
}

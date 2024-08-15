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

export interface TypedRequest<T = any, U = unknown> extends Express.Request {
  body?: U;
  query?: T;
}

export interface RequestWithUser<T = any, U = unknown> extends TypedRequest<T, U> {
  user: JWTPayload;
}

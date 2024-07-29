import { User } from '@interfaces/user.interface';
import jwt from 'jsonwebtoken';
import { AuthUserDto } from '@/dto/auth.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '@/dto/user.dto';
import { NextFunction, Request, Response } from 'express';
import { JWT_SECRET } from '@config';

export function craftPublicUser(user: User): AuthUserDto {
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: '365d',
  });

  return {
    jwt: token,
    user: plainToInstance(UserDto, user.toObject(), {
      excludeExtraneousValues: true,
    }),
  };
}

export function getJWTTokenData(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    next();
    return;
  }

  const split = authorization.split(' ');
  const token = split[1] || '';

  // @ts-ignore
  req.user = jwt.verify(token, JWT_SECRET);
  next();
}

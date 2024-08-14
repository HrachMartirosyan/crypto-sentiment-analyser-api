import { User } from '@interfaces/user.interface';
import jwt from 'jsonwebtoken';
import { AuthUserDto } from '@/dto/auth.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '@/dto/user.dto';
import { JWT_SECRET } from '@config';
import { JWTPayload } from '@interfaces/routes.interface';

export function craftPublicUser(user: User): UserDto {
  return plainToInstance(UserDto, user.toObject(), {
    excludeExtraneousValues: true,
  });
}

export function craftPublicUserWithJWT(user: User): AuthUserDto {
  const payload: JWTPayload = { _id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '365d',
  });

  return {
    jwt: token,
    user: craftPublicUser(user),
  };
}

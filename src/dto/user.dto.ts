import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @Expose()
  _id: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  username: string;
}

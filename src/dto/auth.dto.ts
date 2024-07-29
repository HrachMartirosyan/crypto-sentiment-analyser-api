import { IsEmail, IsString, MinLength, ValidateNested } from 'class-validator';
import { Expose } from 'class-transformer';
import { UserDto } from '@/dto/user.dto';

export class SignInDto {
  @IsString()
  username: string;

  @MinLength(8)
  @IsString()
  password: string;
}

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @MinLength(8)
  @IsString()
  password: string;

  @MinLength(8)
  @IsString()
  repeatPassword: string;
}

export class AuthUserDto {
  @Expose()
  jwt: string;

  @Expose()
  @ValidateNested()
  user: UserDto;
}

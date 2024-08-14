import { IsString, IsEmail, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { UserDto } from '@/dto/user.dto';

export class SignInDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(30)
  @IsString()
  password: string;
}

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @MinLength(8)
  @MaxLength(30)
  @IsString()
  password: string;

  @MinLength(8)
  @MaxLength(30)
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

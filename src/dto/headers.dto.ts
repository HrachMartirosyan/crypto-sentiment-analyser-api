import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class AuthHeaderDto {
  @Expose()
  @IsString()
  authorization: string;
}

import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@/dto/pagination.dto';

export class SentimentChartDto extends PaginationDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsString()
  @IsOptional()
  sentiment?: string;
}

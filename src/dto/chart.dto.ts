import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@/dto/pagination.dto';
import { SentimentChart, SentimentChartAnalysisModel, SentimentChartSentiment, SentimentChartType } from '@interfaces/sentimentChart.interface';
import { Expose } from 'class-transformer';

export class SentimentChartDto extends PaginationDto {
  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  @IsEnum(SentimentChartType)
  type?: SentimentChartType;

  @IsString()
  @IsOptional()
  @IsEnum(SentimentChartSentiment)
  sentiment?: SentimentChartSentiment;

  @IsString()
  @IsOptional()
  @IsEnum(SentimentChartAnalysisModel)
  analysisModel?: SentimentChartAnalysisModel;
}

export class SentimentChartResponseDto implements SentimentChart {
  @IsString()
  @Expose()
  _id: string;

  @IsString()
  @Expose()
  company: string;

  @IsString()
  @IsEnum(SentimentChartType)
  @Expose()
  type: SentimentChartType;

  @IsString()
  @IsEnum(SentimentChartSentiment)
  @Expose()
  sentiment: SentimentChartSentiment;

  @IsString()
  @IsEnum(SentimentChartAnalysisModel)
  @Expose()
  analysisModel: SentimentChartAnalysisModel;

  @IsNumber()
  @Expose()
  value: number;

  @IsString()
  @Expose()
  quarter: string;
}

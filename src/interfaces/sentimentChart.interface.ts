import { Document } from 'mongoose';

export enum SentimentChartType {
  CONTENT = 'content',
  COMMENTS = 'comments',
}

export enum SentimentChartSentiment {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral',
}

export enum SentimentChartAnalysisModel {
  LEXICAN = 'lexican',
  VADER = 'vader',
}

export interface SentimentChart {
  _id?: string;
  company: string;
  type: SentimentChartType;
  analysisModel: SentimentChartAnalysisModel;
  sentiment: SentimentChartSentiment;
  value: Number;
  quarter: string;
}

export interface SentimentChartDocument extends Document {}

import { Document } from 'mongoose';

export interface SentimentChart extends Document {
  _id: string;
  type: string;
  sentiment: string;
  value: Number;
}

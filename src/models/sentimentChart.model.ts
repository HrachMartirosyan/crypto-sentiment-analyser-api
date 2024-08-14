import { model, Schema, Document } from 'mongoose';
import { SentimentChart } from '@interfaces/sentimentChart.interface';

const sentimentChartSchema: Schema = new Schema({
  type: {
    type: String,
    required: true,
  },
  sentiment: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const SentimentChartSchema = model<SentimentChart & Document>('sentiment_chart', sentimentChartSchema);

export default SentimentChartSchema;

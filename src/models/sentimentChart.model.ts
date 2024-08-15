import { model, Schema } from 'mongoose';
import { SentimentChartDocument } from '@interfaces/sentimentChart.interface';

const sentimentChartSchema: Schema = new Schema({
  company: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['content', 'comments'],
    required: true,
  },
  sentiment: {
    type: String,
    enum: ['positive', 'negative', 'neutral'],
    required: true,
  },
  analysisModel: {
    type: String,
    enum: ['lexican', 'vader'],
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  quarter: {
    type: String,
    required: true,
  },
});

const SentimentChartSchema = model<SentimentChartDocument>('sentiment_chart', sentimentChartSchema);

export default SentimentChartSchema;

import fs from 'fs';
import csv from 'csv-parser';
import SentimentChartModel from '@models/sentimentChart.model';
import { SentimentChart, SentimentChartSentiment } from '@interfaces/sentimentChart.interface';
import { capitalizeFirstLetter } from '@utils/str';

const companyMap = {
  amc: 'a-m-c',
  cry: 'crypto-currency',
  gst: 'game-stop',
};

Object.freeze(companyMap);

class MigrateDataService {
  private readonly filename: string;
  private readonly filepath: string;

  private data: SentimentChart[] = [];

  private company: string;
  private type: SentimentChart['type'];
  private analysisModel: SentimentChart['analysisModel'];

  private sentimentChart = SentimentChartModel;

  constructor(filename: string) {
    this.filename = filename;
    this.filepath = `${__dirname}/../../data/${filename}`;

    this.checkFile().then(() => {
      this.getFileMetadata();
    });
  }

  private getFileMetadata() {
    const base = this.filename.replace('.csv', '');
    const [company, type, analysisModel] = base.split('_');
    this.company = companyMap[company];
    this.type = type as SentimentChart['type'];
    this.analysisModel = analysisModel as SentimentChart['analysisModel'];
  }

  private async checkFile() {
    if (!fs.existsSync(this.filepath)) {
      throw new Error(`File ${this.filepath} does not exist`);
    }
  }

  private streamData(onData = (data: any) => {}, onComplete = () => {}) {
    const inputStream = fs.createReadStream(this.filepath, 'utf-8');
    inputStream.pipe(csv()).on('data', onData).on('end', onComplete);
  }

  migrate() {
    this.streamData(this.collect, this.save.bind(this));
  }

  private collect = data => {
    const { Quarter } = data;
    for (const sentiment of Object.values(SentimentChartSentiment)) {
      const value = data[capitalizeFirstLetter(sentiment)];

      this.data.push({
        company: this.company,
        type: this.type,
        analysisModel: this.analysisModel,
        sentiment: sentiment.toLowerCase() as SentimentChart['sentiment'],
        value,
        quarter: Quarter,
      });
    }
  };

  private async save() {
    if (!this.data.length) {
      return;
    }

    for (const chartData of this.data) {
      await this.sentimentChart.findOneAndUpdate(chartData, chartData, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
  }
}

export default MigrateDataService;

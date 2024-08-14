import fs from 'fs';
import csv from 'csv-parser';
import SentimentChartModel from '@models/sentimentChart.model';
import { SentimentChart } from '@interfaces/sentimentChart.interface';
import { camelCaseToDashed } from '@utils/str';

const typeMap = {
  amc: 'a-m-c',
  cry: 'crypto-currency',
  gst: 'game-stop',
};

Object.freeze(typeMap);

class MigrateDataService {
  private readonly filename: string;
  private readonly filepath: string;

  private data: Pick<SentimentChart, 'type' | 'sentiment' | 'value'>[] = [];
  private type: string;

  private sentimentChart = SentimentChartModel;

  constructor(filename: string) {
    this.filename = filename;
    this.filepath = `${__dirname}/../data/${filename}`;

    this.checkFile().then(() => {
      this.getFileType();
    });
  }

  private getFileType() {
    const [first] = this.filename.split('_');
    this.type = typeMap[first];
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
    for (const [key, value] of Object.entries(data)) {
      this.data.push({
        type: this.type,
        sentiment: key.toLowerCase(),
        value: Number(value),
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

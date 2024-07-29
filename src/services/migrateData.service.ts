import fs from 'fs';
import csv from 'csv-parser';

class MigrateDataService {
  private readonly filepath: string;
  private data: any[] = [];

  constructor(filepath: string) {
    this.filepath = `${__dirname}/../${filepath}`;
    this.checkFile();
  }

  private async checkFile() {
    if(!(await fs.existsSync(this.filepath))) {
        throw new Error(`File ${this.filepath} does not exist`);
    }
  }

  private streamData(
      onData = (data: any) => {},
      onComplete = () => {}
  ){
    const inputStream = fs.createReadStream(this.filepath, "utf-8");
    inputStream.pipe(csv()).on("data", onData).on("end", onComplete);
  }

  migrate() {
    this.streamData(this.collect, () => console.log(this.data));
  }

  collect = (data) =>  {
    // console.log('data', data)
    let currentScore = '';
    for(const [key, value] of Object.entries(data)) {
      if(key === 'Score') {
        currentScore = value as string;
        continue;
      }

      this.data.push({
        score: currentScore,
        date: key,
        value
      })
    }
  }
}

export default MigrateDataService;

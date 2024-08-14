import SentimentChartModel from '@models/sentimentChart.model';
import { SentimentChart } from '@interfaces/sentimentChart.interface';
import { SentimentChartDto } from '@/dto/chart.dto';

class ChartService {
  private chart = SentimentChartModel;

  public getSentimentChart(query: SentimentChartDto): Promise<SentimentChart[]> {
    return this.chart.find(query).select(['-__v']);
  }
}

export default ChartService;

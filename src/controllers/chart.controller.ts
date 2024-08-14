import { RequestWithUser } from '@interfaces/routes.interface';
import { NextFunction, Response } from 'express';
import ChartService from '@services/chart.service';
import { SentimentChartDto } from '@/dto/chart.dto';

class ChartController {
  private chartService: ChartService = new ChartService();

  getSentimentChart = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      res.json(await this.chartService.getSentimentChart(req.query as unknown as SentimentChartDto));
    } catch (e) {
      next(e);
    }
  };
}

export default ChartController;

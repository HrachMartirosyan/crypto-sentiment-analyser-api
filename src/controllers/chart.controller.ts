import { RequestWithUser } from '@interfaces/routes.interface';
import { NextFunction, Response } from 'express';
import ChartService from '@services/chart.service';
import { SentimentChartDto, SentimentChartResponseDto } from '@/dto/chart.dto';
import { exposedPlainToInstance } from '@utils/router';

class ChartController {
  private chartService: ChartService = new ChartService();

  getSentimentChart = async (req: RequestWithUser<null, SentimentChartDto>, res: Response<SentimentChartResponseDto[]>, next: NextFunction) => {
    try {
      res.json(exposedPlainToInstance(SentimentChartResponseDto, await this.chartService.getSentimentChart(req.query)));
    } catch (e) {
      next(e);
    }
  };
}

export default ChartController;

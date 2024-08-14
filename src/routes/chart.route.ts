import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ChartController from '@controllers/chart.controller';
import RequestValidator from '@/validators/request.validator';
import { AuthHeaderDto } from '@/dto/headers.dto';
import { SentimentChartDto } from '@/dto/chart.dto';

class ChartRoute implements Routes {
  public path = '/chart';
  public router = Router();
  public controller = new ChartController();

  private validator = new RequestValidator();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/sentiment`,
      this.validator.validateHeaders(AuthHeaderDto),
      this.validator.validateQuery(SentimentChartDto),
      this.controller.getSentimentChart,
    );
  }
}

export default ChartRoute;

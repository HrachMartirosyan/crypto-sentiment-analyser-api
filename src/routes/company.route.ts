import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import CompanyController from '@controllers/company.controller';
import RequestValidator from '@/validators/request.validator';
import { AuthHeaderDto } from '@/dto/headers.dto';

class CompanyRoute implements Routes {
  public path = '/company';
  public router = Router();
  public controller = new CompanyController();

  private validator = new RequestValidator();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, this.validator.validateHeaders(AuthHeaderDto), this.controller.getCompanies);
  }
}

export default CompanyRoute;

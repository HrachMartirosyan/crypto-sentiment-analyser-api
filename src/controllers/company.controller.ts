import { NextFunction, Response } from 'express';

import CompanyService from '@services/company.service';
import { RequestWithUser } from '@interfaces/routes.interface';

class CompanyController {
  public companyService: CompanyService = new CompanyService();

  public getCompanies = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      res.json(await this.companyService.getCompanies());
    } catch (e) {
      next(e);
    }
  };
}

export default CompanyController;

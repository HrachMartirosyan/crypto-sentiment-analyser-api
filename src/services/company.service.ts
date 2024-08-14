import CompanyModel from '@models/company.model';
import { Company } from '@interfaces/company.interface';

class CompanyService {
  private companies = CompanyModel;

  public getCompanies(): Promise<Company[]> {
    return this.companies.find().select(['-__v']);
  }
}

export default CompanyService;

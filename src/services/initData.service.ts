import CompanyModel from '@models/company.model';
import { camelCaseToDashed } from '@utils/str';

class InitDataService {
  private companies = CompanyModel;

  private companyData = [
    {
      name: 'AMC',
    },
    {
      name: 'GameStop',
    },
    {
      name: 'CryptoCurrency',
    },
  ];

  async createCompanies() {
    if (!this.companyData.length) {
      return;
    }

    for (const company of this.companyData) {
      await this.companies.findOneAndUpdate(
        { name: company.name },
        { name: company.name, slug: camelCaseToDashed(company.name) },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    }
  }
}

export default InitDataService;

import InitDataService from '@services/initData.service';

class InitDataController {
  private service: InitDataService = new InitDataService();

  public async create() {
    console.log('=================================');
    console.log('🔄 Creating INIT Data');
    console.log('=================================');
    return Promise.all([this.service.createCompanies()]);
  }
}

export default InitDataController;

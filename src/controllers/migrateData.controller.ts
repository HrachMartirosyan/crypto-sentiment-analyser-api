import cron from 'node-cron';

import MigrateDataService from '@services/migrateData.service';

class MigrateDataController {
  private service: MigrateDataService;

  constructor(filepath: string) {
    this.service = new MigrateDataService(filepath);
  }

  public schedule() {
    // every 24 hours at 00:00
    cron.schedule('0 0 * * *', this.migrate);
  }

  public async migrate() {
    console.log('=================================');
    console.log('🔄 Migrating');
    console.log('=================================');

    await this.service.migrate();


    // END
  }
}

export default MigrateDataController;

import cron from 'node-cron';

import MigrateDataService from '@services/migrateData.service';

class MigrateDataController {
  private service: MigrateDataService;

  constructor(filename: string) {
    this.service = new MigrateDataService(filename);
  }

  public schedule() {
    // every 24 hours at 00:00
    cron.schedule('0 0 * * *', this.migrate);
  }

  public async migrate() {
    console.log('=================================');
    console.log('🔄 Migrating');
    console.log('=================================');

    return this.service.migrate();
  }
}

export default MigrateDataController;

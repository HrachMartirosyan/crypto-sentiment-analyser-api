import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set, disconnect } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';

import MigrateDataController from '@controllers/migrateData.controller';
import InitDataController from '@controllers/initData.controller';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  private initData: InitDataController;
  private migrationsData: MigrateDataController[] = [];

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase().then(async () => {
      this.initializeMiddlewares();
      await this.initializeInitData();
      this.initializeRoutes(routes);
      this.initializeSwagger();
      this.initializeErrorHandling();
      await this.initializeMigrateData();
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public async closeDatabaseConnection(): Promise<void> {
    try {
      await disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    await connect(dbConnection.url);

    console.log('💿 Connected to MongoDB');
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private async initializeInitData() {
    this.initData = new InitDataController();
    return this.initData.create();
  }

  private async initializeMigrateData() {
    const filenames = [
      'amc_comments_lexican.csv',
      'amc_comments_vader.csv',
      'amc_content_lexican.csv',
      'amc_content_vader.csv',
      'cry_comments_lexican.csv',
      'cry_comments_vader.csv',
      'cry_content_lexican.csv',
      'cry_content_vader.csv',
      'gst_comments_lexican.csv',
      'gst_comments_vader.csv',
      'gst_content_lexican.csv',
      'gst_content_vader.csv',
    ];

    for (const filename of filenames) {
      const migrateDataController = new MigrateDataController(filename);
      await migrateDataController.migrate();
      this.migrationsData.push(migrateDataController);
    }
  }
}

export default App;

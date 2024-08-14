import App from '@/app';

import IndexRoute from '@routes/index.route';

import validateEnv from '@utils/validateEnv';
import AuthRoute from '@routes/auth.route';
import UserRoute from '@routes/user.route';
import CompanyRoute from '@routes/company.route';
import ChartRoute from '@routes/chart.route';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new UserRoute(), new CompanyRoute(), new ChartRoute()]);

app.listen();

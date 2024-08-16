import { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } from '@config';

let credentials = '';

if (DB_USERNAME && DB_PASSWORD) {
  credentials = `${DB_USERNAME}:${encodeURIComponent(DB_PASSWORD)}@`;
}

export const dbConnection = {
  url: `mongodb://${credentials}${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

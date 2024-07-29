<h1 align="center">
  <br>
  <img src="https://miro.medium.com/v2/resize:fit:826/1*lkp5yztcHJ1yPMLWQc4dwA.png" alt="Project Logo" />
  <br>
</h1>
## ⚒ How to Install

```bash
$ npm i
```
## Configuration

Before starting the project, make sure to set up your database credentials in the `.env.development.local` file. This file is used for local development and should not be committed to version control. Here's an example of how the `.env.development.local` file should be structured:
### Database Configuration
- **DB_HOST=** 127.0.0.1
- **DB_PORT=** 27017
- **DB_DATABASE=** dev
- **LOG_FORMAT=** dev
- **LOG_DIR=** ../logs

Do the same for the testing in the file `.env.test.local`

For testing
```bash
$ npm run test
```
## Swagger

To use api with Swagger go to [Swagger Local route](http://localhost:3000/api-docs)

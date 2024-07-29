import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import ReposRoute from '@routes/repos.route';

beforeAll(async () => {
  jest.setTimeout(10000);
});
afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Repos', () => {
  describe('[GET] /repos', () => {
    it('List all Repositories', async () => {
      const reposRoute = new ReposRoute();
      const repos = reposRoute.controller.reposService.repos;

      repos.find = jest.fn().mockReturnValue({
        select: () => [
          {
            username: 'test',
            repoName: 'test',
            description: 'test',
            programmingLanguage: 'N/A',
            contributors: ['test'],
          },
        ],
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([reposRoute]);

      return request(app.getServer()).get(`${reposRoute.path}`).expect(200);
    });
  });

  describe('[GET] /repos/{name}', () => {
    it('find repository by name', async () => {
      const reposRoute = new ReposRoute();
      const repos = reposRoute.controller.reposService.repos;

      repos.findOne = jest.fn().mockReturnValue({
        select: () => ({
          username: 'test',
          repoName: 'test',
          description: 'test',
          programmingLanguage: 'N/A',
          contributors: ['test'],
        }),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([reposRoute]);

      return request(app.getServer()).get(`${reposRoute.path}/test`).expect(200);
    });
  });

  describe('[GET] /repos/statistics', () => {
    it('Get repositories statistics', async () => {
      const reposRoute = new ReposRoute();

      const repos = reposRoute.controller.reposService.repos;
      const statistics = reposRoute.controller.reposService.statistics;

      repos.findOne = jest.fn().mockReturnValue({
        select: () => ({
          _id: 'test',
          programmingLanguage: 'N/A',
        }),
      });

      statistics.findOne = jest.fn().mockReturnValue({
        select: () => ({
          count: [
            {
              name: 'test',
              count: 1,
            },
          ],
          withoutLanguage: ['test'],
        }),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([reposRoute]);

      return request(app.getServer()).get(`${reposRoute.path}/statistics`).expect(200);
    });
  });
});

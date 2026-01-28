const request = require('supertest');
const app = require('../src/app');

let employeeToken;

beforeAll(async () => {
  const res = await request(app)
    .post('/auth/login')
    .send({
      email: 'employee@test.com',
      password: 'password123'
    });

  employeeToken = res.body.accessToken;
});

describe('Tasks Module', () => {
  it('should allow employee to update own task status', async () => {
    const res = await request(app)
      .patch('/tasks/1/status')
      .set('Authorization', `Bearer ${employeeToken}`)
      .send({ status: 'DONE' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('DONE');
  });
});

const request = require('supertest');
const app = require('../src/app');

let token;

beforeAll(async () => {
  const res = await request(app)
    .post('/auth/login')
    .send({
      email: 'admin@test.com',
      password: 'password123'
    });

  token = res.body.accessToken;
});

describe('Customers Module', () => {
  it('should fetch customers list with auth', async () => {
    const res = await request(app)
      .get('/customers')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
  });
});

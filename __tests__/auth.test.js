const request = require('supertest');
const app = require('../src/app');

describe('Auth Module', () => {
  it('should login user and return JWT', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email');
  });
});

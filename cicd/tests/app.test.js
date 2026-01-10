const request = require('supertest');
const app = require('../src/app');

describe('POST /login', () => {
    it('should return 200 for valid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'admin', password: '1234' });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Login successful! Welcome to CI/CD.');
    });

    it('should return 401 for invalid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'admin', password: 'wrongpassword' });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Invalid credentials');
    });

    it('should return 401 for non-existent user', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'unknown', password: '1234' });

        expect(response.statusCode).toBe(401);
    });
});

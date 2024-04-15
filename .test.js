const request = require('supertest');
const app = require('./app'); // Your Express app

describe('Route Configuration', () => {
    it('GET / should return status code 200', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    it('GET /about should return status code 200', async () => {
        const response = await request(app).get('/about');
        expect(response.statusCode).toBe(200);
    });

    // Add more route tests as needed
});

describe('Authentication Flow', () => {
    it('GET /auth/dashboard should return status code 302 (redirect) when not authenticated', async () => {
        const response = await request(app).get('/auth/dashboard');
        expect(response.statusCode).toBe(302); // Redirect status code
        expect(response.headers.location).toBe('/login'); // Redirect to login page
    });

    // Add more authentication tests as needed
});

describe('View Rendering', () => {
    it('GET / should render home view', async () => {
        const response = await request(app).get('/');
        expect(response.text).toContain('Home'); // Check if 'Home' is present in the response body
    });

    it('GET /about should render about view', async () => {
        const response = await request(app).get('/about');
        expect(response.text).toContain('About'); // Check if 'About' is present in the response body
    });

    // Add more view rendering tests as needed
});

const request = require('supertest');
const app = require('../index');  // Path to your index.js file

describe('GET /', () => {
  it('should return a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Welcome to the Weather App!');
  });
});

describe('GET /weather', () => {
  it('should return weather data for a valid city', async () => {
    const res = await request(app).get('/weather').query({ city: 'London' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('city');
    expect(res.body).toHaveProperty('temperature');
    expect(res.body).toHaveProperty('description');
  });

  it('should return 400 if city is not provided', async () => {
    const res = await request(app).get('/weather');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'City is required');
  });
});

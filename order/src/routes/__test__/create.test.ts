import request from 'supertest';
import app from '../../app';

describe('Create Order Route', () => {
  it('should a POST method to create an order', async () => {
    const res = await request(app).post('/api/orders').send({});

    expect(res.status).not.toEqual(404);
  });

  it('should requires a restaurantId to create an order', async () => {
    const res = await request(app).post('/api/orders').send({});

    expect(res.status).toBe(400);
    expect(res.body.errors['restaurantId']).toBe('Restaurant must be provided');
  });

  it('should requires a customerId to create an order', async () => {
    const res = await request(app).post('/api/orders').send({});

    expect(res.status).toBe(400);
    expect(res.body.errors['customerId']).toBe('Customer must be provided');
  });
});

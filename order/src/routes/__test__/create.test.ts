import request from 'supertest';
import app from '../../app';
import { Order } from '../../models/order';

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

  it('should create an order if required fields are valid', async () => {
    const res = await request(app).post('/api/orders').send({
      restaurantId: '1',
      customerId: 'X',
    });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.restaurantId).toBe('1');
    expect(res.body.customerId).toBe('X');

    const order = await Order.findById(res.body.id);
    expect(order.id).toBe(res.body.id);
    expect(order.restaurantId).toBe('1');
    expect(order.customerId).toBe('X');
  });
});

import request from 'supertest';
import app from '../../app';
import { Rating } from '../../models/rating';

describe('Create Rating Route', () => {
  it('should defines a POST method to create a rating', async () => {
    const res = await request(app).post('/api/rating').send({});

    expect(res.status).not.toEqual(404);
  });

  it('should requires a restaurantId to save a rating', async () => {
    const res = await request(app).post('/api/rating').send({});

    expect(res.status).toBe(400);
    expect(res.body.errors['restaurantId']).toBe('Restaurant must be provided');
  });

  it('should requires a customerId', async () => {
    const res = await request(app).post('/api/rating').send({});

    expect(res.status).toBe(400);
    expect(res.body.errors['customerId']).toBe('Customer must be provided');
  });

  it('should requires an orderId', async () => {
    const res = await request(app).post('/api/rating').send({});

    expect(res.status).toBe(400);
    expect(res.body.errors['orderId']).toBe('Order must be provided');
  });

  it('should fails if rating is empty', async () => {
    let res = await request(app).post('/api/rating').send({});

    expect(res.status).toBe(400);
    expect(res.body.errors['rating']).toBe('Rating must be between 0 and 5');
  });

  it('should fails if rating is less than 0', async () => {
    let res = await request(app).post('/api/rating').send({
      rating: -1,
    });

    expect(res.status).toBe(400);
    expect(res.body.errors['rating']).toBe('Rating must be between 0 and 5');
  });

  it('should fails if rating is greater than 5', async () => {
    let res = await request(app).post('/api/rating').send({
      rating: 6,
    });

    expect(res.status).toBe(400);
    expect(res.body.errors['rating']).toBe('Rating must be between 0 and 5');
  });

  it('should saves an rating if payload is valid', async () => {
    let res = await request(app).post('/api/rating').send({
      orderId: '1',
      restaurantId: 'MC01',
      customerId: 'XR9',
      rating: 5,
    });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined;
    expect(res.body.orderId).toBe('1');
    expect(res.body.restaurantId).toBe('MC01');
    expect(res.body.customerId).toBe('XR9');
    expect(res.body.rating).toBe(5);

    const rating = await Rating.findById(res.body.id);
    expect(rating.id).toBe(res.body.id);
    expect(rating.orderId).toBe('1');
    expect(rating.restaurantId).toBe('MC01');
    expect(rating.customerId).toBe('XR9');
    expect(rating.rating).toBe(5);
  });
});

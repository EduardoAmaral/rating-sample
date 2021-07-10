import request from 'supertest';
import app from '../../app';

describe('Create Order Route', () => {
    it('defines a POST method to create an order', async () => {
        const res = await request(app).post('/api/orders').send({});

        expect(res.status).not.toEqual(404);
    });
});
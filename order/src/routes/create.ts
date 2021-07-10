import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { Order } from '../models/order';

const router = express.Router();

router.post(
  '/api/orders',
  body('restaurantId').notEmpty().withMessage('Restaurant must be provided'),
  body('customerId').notEmpty().withMessage('Customer must be provided'),
  validateRequest,
  async (req: Request, res: Response) => {
    const { restaurantId, customerId } = req.body;

    const order = await Order.build({ restaurantId, customerId }).save();

    res.status(201).send(order);
  }
);

export { router as createOrderRouter };

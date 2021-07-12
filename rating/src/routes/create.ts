import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Rating } from 'models/rating';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/rating',
  body('restaurantId').notEmpty().withMessage('Restaurant must be provided'),
  body('customerId').notEmpty().withMessage('Customer must be provided'),
  body('orderId').notEmpty().withMessage('Order must be provided'),
  body('rating').isInt({ min: 0, max: 5}).withMessage('Rating must be between 0 and 5'),
  validateRequest,
  async (req: Request, res: Response) => {
    const { restaurantId, customerId, orderId, rating } = req.body;

    const savedOrder = await Rating.build({ restaurantId, customerId, orderId, rating }).save();

    res.status(201).send(savedOrder);
  }
);

export { router as createRatingRouter };

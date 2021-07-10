import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/orders',
  body('restaurantId').notEmpty().withMessage('Restaurant must be provided'),
  body('customerId').notEmpty().withMessage('Customer must be provided'),
  validateRequest,
  (req: Request, res: Response) => {
    res.status(201).send({});
  }
);

export { router as createOrderRouter };

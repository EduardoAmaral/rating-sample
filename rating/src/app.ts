import express from 'express';
import { json } from 'body-parser';
import { createRatingRouter } from './routes/create';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(createRatingRouter);

app.use(errorHandler);

export default app;

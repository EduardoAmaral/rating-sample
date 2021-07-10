import express from 'express';
import { json } from 'body-parser';
import { createOrderRouter } from './routes/create';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.set('trust proxy', true);

app.use(createOrderRouter);

app.use(json());

app.use(errorHandler);

export default app;

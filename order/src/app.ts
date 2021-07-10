import express from 'express';
import { json } from 'body-parser';
import { createOrderRouter } from './routes/create';

const app = express();

app.set('trust proxy', true);

app.use(createOrderRouter);

app.use(json());

export default app;

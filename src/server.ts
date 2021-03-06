import 'reflect-metadata';
import './config/env';
import './database';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  console.log(err);
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(3030);

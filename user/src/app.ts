import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { userRouter } from './routes/user';

const app = express();

app.use(json());

app.use('/api/v1/user', userRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

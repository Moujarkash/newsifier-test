import { app } from './app';
import dbInit from './db/init';

const PORT = process.env.PORT || 3000;

const start = async () => {
  if (!process.env.DB_PASSWORD) {
    throw new Error('DB_PASSWORD must be defined');
  }

  if (!process.env.DB_USER) {
    throw new Error('DB_USER must be defined');
  }

  if (!process.env.DB_HOST) {
    throw new Error('DB_HOST must be defined');
  }

  if (!process.env.DB_DRIVER) {
    throw new Error('DB_DRIVER must be defined');
  }

  if (!process.env.DB_NAME) {
    throw new Error('DB_NAME must be defined');
  }

  if (!process.env.TEST_DB_NAME) {
    throw new Error('TEST_DB_NAME must be defined');
  }

  try {
    await dbInit();
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

start();

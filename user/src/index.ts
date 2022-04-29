import { app } from './app';
import { mysqlWrapper } from './mysql-wrapper';

const PORT = process.env.PORT || 3000;

const start = async () => {
  if (!process.env.MYSQL_URL) {
    throw new Error('MYSQL_URL must be defined');
  }

  try {
    await mysqlWrapper.connect(process.env.MYSQL_URL);
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

start();

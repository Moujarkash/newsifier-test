import mysql from 'mysql2/promise';

import User from '../models/user';
import Image from '../models/image';

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

const dbInit = async () => {
  await createAppDB();

  Promise.all([
    User.sync({ alter: isDev || isTest }),
    Image.sync({ alter: isDev || isTest }),
  ]);
};

async function createAppDB() {
  // Open the connection to MySQL server
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  // Run create database statement
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`
  );

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.TEST_DB_NAME};`
  );

  // Close the connection
  await connection.end();
}

export default dbInit;

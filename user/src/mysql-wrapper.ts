import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import { initUser } from './models/user';
import { initImage } from './models/image';

class MysqlWrapper {
  private _client?: Sequelize;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access MYSQL before connecting');
    }

    return this._client;
  }

  async connect(url: string) {
    const connection = await mysql.createConnection(url);
    const dbName = 'NEWSIFIER_USERS';
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);

    this._client = new Sequelize(`${url}${dbName}`);
    await this._client.authenticate();

    initImage(this._client);
    initUser(this._client);

    await this._client.sync();
  }
}

export const mysqlWrapper = new MysqlWrapper();

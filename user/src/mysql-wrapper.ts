import mysql, { Connection } from 'mysql2/promise';

class MysqlWrapper {
    private _connection?: Connection;

  get connection() {
    if (!this._connection) {
      throw new Error('Cannot access MYSQL before connecting');
    }

    return this._connection;
  }

  async connect(url: string) {
    this._connection = await mysql.createConnection(url);
  }
}

export const mysqlWrapper = new MysqlWrapper();
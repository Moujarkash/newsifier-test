import { mysqlWrapper } from '../mysql-wrapper';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class Image extends Model {}

export const initImage = (seq: Sequelize) => {
  Image.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: seq,
      modelName: 'Image',
      tableName: 'images',
    }
  );
};

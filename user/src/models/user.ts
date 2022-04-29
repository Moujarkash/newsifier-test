import { DataTypes, Model, Sequelize } from 'sequelize';
import { Image } from './image';

export class User extends Model {}

export const initUser = (seq: Sequelize) => {
    User.init(
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          karmaScore: {
            field: 'karma_score',
            type: DataTypes.INTEGER.ZEROFILL,
            defaultValue: 0,
          },
          imageId: {
            field: 'image_id',
            type: DataTypes.INTEGER,
            references: {
              model: Image,
              key: 'id',
            },
          },
        },
        {
          sequelize: seq,
          modelName: 'User',
          tableName: 'users',
        }
      );
};


import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import sequelize from '../db/config';
import Image from './image';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare karma_score: CreationOptional<number>;
  declare image_id: ForeignKey<Image['id']>;
  declare image?: NonAttribute<Image>;
  declare position?: NonAttribute<number>;
}

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
    karma_score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: sequelize,
    timestamps: false,
    tableName: 'users',
    underscored: true,
  }
);

User.belongsTo(Image, { foreignKey: 'image_id', as: 'image' });

export default User;

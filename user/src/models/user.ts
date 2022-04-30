import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../db/config';
import Image from './image';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare karmaScore: CreationOptional<number>;
  declare imageId: ForeignKey<Image['id']>;

  declare getImage: HasOneGetAssociationMixin<Image>;
  declare createImage: HasOneCreateAssociationMixin<Image>;
  declare setImage: HasOneSetAssociationMixin<Image, number>;
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
    karmaScore: {
      type: DataTypes.INTEGER.ZEROFILL,
      defaultValue: 0,
    }
  },
  {
    sequelize: sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
  }
);

export default User;

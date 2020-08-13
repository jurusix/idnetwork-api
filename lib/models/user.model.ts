import { Model, DataTypes, HasManyGetAssociationsMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin } from "sequelize";
import { Role } from "./role.model";
import { sequelize } from "../database/sequelize";
import { IUserAttributes, IUserCreationAttributes } from "../interfaces/user.interface";

export class User extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getRoles!: HasManyGetAssociationsMixin<Role>;
  public setRoles!: HasManySetAssociationsMixin<Role, number>;
  public removeRoles!: HasManyRemoveAssociationsMixin<Role, number>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }
  },
  {
    tableName: "user",
    sequelize,
  }
);

User.belongsToMany(Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

Role.belongsToMany(User, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
import { Model, DataTypes, HasManyGetAssociationsMixin, HasManySetAssociationsMixin } from "sequelize";
import { sequelize } from "../database/sequelize";
import { IRoleAttributes, IRoleCreationAttributes } from "../interfaces/role.interface";


export class Role extends Model<IRoleAttributes, IRoleCreationAttributes>
  implements IRoleAttributes {
  public id: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUsers!: HasManyGetAssociationsMixin<Role>;
  public setUsers: HasManySetAssociationsMixin<Role, number>;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }
  },
  {
    tableName: "role",
    sequelize,
  }
);

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize";
import { IMessageAttributes, IMessageCreationAttributes } from "../interfaces/message.interface";


export class Message extends Model<IMessageAttributes, IMessageCreationAttributes>
  implements IMessageAttributes {
  public id: number;
  public name!: string;
  public text!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(45),
      allowNull: false,
    },
    text: {
      type: new DataTypes.STRING(1024),
      allowNull: false,
    },
  },
  {
    tableName: "message",
    sequelize,
  }
);

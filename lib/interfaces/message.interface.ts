import { Optional } from "sequelize/types";

export interface IMessageAttributes {
  id: number;
  name: string;
  text: string;
}

export interface IMessageCreationAttributes extends Optional<IMessageAttributes, "id"> { }
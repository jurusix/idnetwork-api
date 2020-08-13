import { Optional } from "sequelize/types";

export interface IRoleAttributes {
  id: number;
  name: string;
}

export interface IRoleCreationAttributes extends Optional<IRoleAttributes, "id"> { }
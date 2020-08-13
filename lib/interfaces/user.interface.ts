import { Optional } from "sequelize/types";

export interface IUserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, "id"> { }
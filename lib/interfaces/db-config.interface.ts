import { Dialect } from "sequelize/types";

export interface IDatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  dialect?: Dialect;
  urlDatabase?: string;
  max?: number;
  min?: number;
  acquire?: number;
  idle?: number;
}

export interface IDatabaseConfig {
  env: IDatabaseConfigAttributes;
}
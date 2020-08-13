import { IDatabaseConfig } from "../interfaces/db-config.interface";
import { Dialect } from "sequelize/types";
import * as dotenv from "dotenv";
dotenv.config();

export const databaseConfig: IDatabaseConfig = {
  env: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT as Dialect,
    max: parseInt(process.env.DB_MAX, 10),
    min: parseInt(process.env.DB_MIN, 10),
    acquire: parseInt(process.env.DB_ACQUIRE, 10),
    idle: parseInt(process.env.DB_IDLE, 10),
  }
};

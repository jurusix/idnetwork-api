import { Sequelize } from "sequelize";
import { databaseConfig } from "./config";

export const sequelize: Sequelize = new Sequelize(
  databaseConfig.env.database,
  databaseConfig.env.username,
  databaseConfig.env.password,
  {
    host: databaseConfig.env.host,
    dialect: databaseConfig.env.dialect,
    pool: {
      max: databaseConfig.env.max,
      min: databaseConfig.env.min,
      acquire: databaseConfig.env.acquire,
      idle: databaseConfig.env.idle
    }
  }
);

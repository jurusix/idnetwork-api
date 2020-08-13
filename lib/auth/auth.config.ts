import { IAuthConfig } from "../interfaces/auth-config.interface";
import * as dotenv from "dotenv";
dotenv.config();

export const authConfig: IAuthConfig = {
  secret: process.env.JWTKEY,
  tokenExpiration: parseInt(process.env.TOKEN_EXPIRATION, 10),
  bearer: process.env.BEARER
};

import * as express from "express";
import * as mysql from "mysql";
import { Routes } from "./routes/routes";

class App {

  public express: express.Application;
  public routePrv: Routes = new Routes();
  public pool = mysql.createPool({
    connectionLimit: 10,
    host: "data",
    user: "root",
    password: "root",
    database: "IDnetwork-API"
  });

  constructor() {
    this.express = express();
    this.config();
    this.routePrv.routes(this.express);
  }

  private config(): void {
    this.express.disable("x-powered-by");
    this.express.set("etag", false);
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "https://api.idnetwork.cz,https://pwa-template.idnetwork.cz,https://localhost:4200/");
      res.set("Cache-Control", "no-store");
      res.set("Content-Security-Policy", "default-src 'self' *.idnetwork.cz");
      next();
    });
  }
}

export default new App();
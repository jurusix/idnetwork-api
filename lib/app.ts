import * as express from "express";
import { Routes } from "./routes/routes";
import { sequelize } from "./database/sequelize";

class App {

  public express: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.express = express();
    this.config();
    this.routePrv.routes(this.express);
    sequelize.sync();
  }

  private config(): void {
    this.express.disable("x-powered-by");
    this.express.set("etag", false);
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      res.header("Access-Control-Allow-Origin", "https://api.idnetwork.cz,https://pwa-template.idnetwork.cz,https://localhost:4200/");
      res.set("Cache-Control", "no-store");
      res.set("Content-Security-Policy", "default-src 'self' *.idnetwork.cz");
      next();
    });
  }
}

export default new App();
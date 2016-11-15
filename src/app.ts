"use strict";

// import * as bodyParser from "body-parser";
import * as express from "express";
import * as StaticRoutes from "./routes/static"

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();

    let router = express.Router();

    router.get("/", StaticRoutes.index);

    this.app.use(router);
    this.app.listen(8080, () => {
      console.log("Running on port 8080!");
    });
  }
}

new Server();

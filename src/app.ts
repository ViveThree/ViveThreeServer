"use strict";

import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as cors from "cors";
import * as Promise from "bluebird";
import * as path from "path";

import { StaticsController } from "./controllers/staticsController";
import { PurchasesController } from "./controllers/PurchasesController";
import { UsersController } from "./controllers/UsersController";

function start() : Promise<any> {
  return Promise
    .resolve(express())
    .then((app: express.Application) => {
      const router = express.Router();

      // Middleware and options
      app.set('views', path.join(__dirname, '../views'));
      app.set('view engine', 'pug');
      app.set("etag", false);
      app.disable("x-powered-by");
      app.use(cookieParser());
      app.use(session({ secret: 'we love haircare' }));

      app.use(bodyParser.json()); // for parsing application/json
      app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

      app.use((req:express.Request, _:express.Response, next:express.NextFunction) => {
        console.log(`${req.method} ${req.url} - ${req.ip}`);
        next();
      });

      // Routes
      let staticsController = new StaticsController();
      router.get("/", staticsController.index);
      router.get("/about", staticsController.about);

      let usersController = new UsersController();
      router.get("/login", usersController.login);

      let purchasesController = new PurchasesController();
      router.get("/buy", purchasesController.buy);

      const corsOptions = {
        origin: "https://shop.trycelery.com",
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
      };
      router.options("/confirm", cors(corsOptions));
      router.post("/confirm", cors(corsOptions), purchasesController.confirm);

      // Static Routes
      app.use("/static/js", express.static(path.join(__dirname, '../build/client')))
      app.use("/static", express.static(path.join(__dirname, '../static')))
      app.use("/vendor", express.static(path.join(__dirname, '../vendor')))
      app.use(router);

      return app;

    }).then((app: express.Application) => {
      return new Promise((resolve) => {
        const port = process.env.PORT || 8080;
        app.set('port', port);

        let server = app.listen(port, () => {
          console.log(`Running on port ${port}!`);
          resolve(server);
        });
      });
    });
}

start();

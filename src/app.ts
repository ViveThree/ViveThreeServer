"use strict";

import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as StaticRoutes from "./routes/static";
import * as PurchaseRoutes from "./routes/purchase";
import * as UserRoutes from "./routes/user";
import * as path from "path";

class Server {
  constructor() {
    const app = express();
    const router = express.Router();

    // Middleware
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    // Routes
    router.get("/", this.promisifyRoute(StaticRoutes.index));
    router.get("/about", this.promisifyRoute(StaticRoutes.about));
    router.get("/login", this.promisifyRoute(UserRoutes.login));
    router.get("/buy", this.promisifyRoute(PurchaseRoutes.buy));

    const corsOptions = {
      origin: "https://shop.trycelery.com",
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    router.get("/confirm", cors(corsOptions), this.promisifyRoute(PurchaseRoutes.confirm));

    // Static Routes
    app.use("/static/js", express.static(path.join(__dirname, '../build/client')))
    app.use("/static", express.static(path.join(__dirname, '../static')))
    app.use("/vendor", express.static(path.join(__dirname, '../vendor')))
    app.use(router);

    app.set('views', './views')
    app.set('view engine', 'pug')

    const port = process.env.PORT || 8080;
    app.set('port', port);

    app.listen(port, () => {
      console.log(`Running on port ${port}!`);
    });
  }

  // Convert our promise-based routes back to express-compatible callback functions
  promisifyRoute(routeFn: (req: express.Request, res: express.Response) => Promise<any>) :
    (req: express.Request, res: express.Response, next: express.NextFunction) => void {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      routeFn(req, res).then((_: any) => {
        next();
      });
    };
  }
}

new Server();

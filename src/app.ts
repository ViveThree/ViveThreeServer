"use strict";

// import * as bodyParser from "body-parser";
import * as express from "express";
import * as StaticRoutes from "./routes/static"
import * as PurchaseRoutes from "./routes/purchase"
import * as UserRoutes from "./routes/user"
import * as path from "path"

class Server {
  constructor() {
    const app = express();
    const router = express.Router();

    router.get("/", this.promisifyRoute(StaticRoutes.index));
    router.get("/about", this.promisifyRoute(StaticRoutes.about));
    router.get("/buy", this.promisifyRoute(PurchaseRoutes.buy));
    router.get("/login", this.promisifyRoute(UserRoutes.login));

    app.use("/static/js", express.static(path.join(__dirname, '../build/client')))
    app.use("/static", express.static(path.join(__dirname, '../static')))
    app.use("/vendor", express.static(path.join(__dirname, '../vendor')))
    app.use(router);

    app.set('views', './views')
    app.set('view engine', 'pug')

    app.listen(8080, () => {
      console.log("Running on port 8080!");
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

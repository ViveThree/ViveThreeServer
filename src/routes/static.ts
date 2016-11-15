"use strict";
import * as express from "express";

module StaticRoutes {
  export function index(_: express.Request, res: express.Response, next: express.NextFunction): void {
    res.send("This works!");
    next();
  }
}

export = StaticRoutes;

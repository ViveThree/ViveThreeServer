"use strict";
import * as express from "express";
import * as Promise from "bluebird";

module UserRoutes {
  export function login(_: express.Request, res: express.Response): Promise<any> {
    res.render('login', {});
    return Promise.resolve(null);
  }
}

export = UserRoutes;

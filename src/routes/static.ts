"use strict";
import * as express from "express";
import * as Promise from "bluebird";

module StaticRoutes {
  export function index(_: express.Request, res: express.Response): Promise<any> {
    res.render('index', {});
    return Promise.resolve(null);
  }

  export function about(_: express.Request, res: express.Response): Promise<any> {
    res.render('about', {});
    return Promise.resolve(null);
  }
}

export = StaticRoutes;

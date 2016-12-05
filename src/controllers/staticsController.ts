"use strict";

import * as express from "express";
import * as Promise from "bluebird";
import { BaseController } from "./baseController";

export class StaticsController extends BaseController {
  constructor() {
    super();
  }

  index(_: express.Request, res: express.Response): Promise<any> {
    res.render('index', {});
    return Promise.resolve(null);
  }

  about(_: express.Request, res: express.Response): Promise<any> {
    res.render('about', {});
    return Promise.resolve(null);
  }
}

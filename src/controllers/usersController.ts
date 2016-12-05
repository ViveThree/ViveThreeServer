"use strict";

import * as express from "express";
import * as Promise from "bluebird";
import { BaseController } from "./baseController";

export class UsersController extends BaseController {
  constructor() {
    super();
  }

  login(_: express.Request, res: express.Response): Promise<any> {
    res.render('login', {});
    return Promise.resolve(null);
  }
}

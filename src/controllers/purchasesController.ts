"use strict";

import * as express from "express";
import { BaseController } from "./baseController";

export class PurchasesController extends BaseController {
  constructor() {
    super();
  }

  buy(_: express.Request, res: express.Response): Promise<any> {
    res.render('buy', {});
    return Promise.resolve(null);
  }

  confirm(req: express.Request, res: express.Response): Promise<any> {
    let order: CeleryOrder = req.body.orderData;

    // Create or get user by email

    // Create or get items by SKU

    // Create order with user_id, map of { item: quantity }

    res.json({ received: order });
    return Promise.resolve(null);
  }
}

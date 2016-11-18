"use strict";
import * as express from "express";

module PurchaseRoutes {
  export function buy(_: express.Request, res: express.Response): Promise<any> {
    res.render('buy', {});
    return Promise.resolve(null);
  }

  export function confirm(req: express.Request, res: express.Response): Promise<any> {
    let order: CeleryOrder = req.body.orderData;
    res.json({ received: order });
    return Promise.resolve(null);
  }
}

export = PurchaseRoutes;

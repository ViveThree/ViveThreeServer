"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseController_1 = require("./baseController");
var PurchasesController = (function (_super) {
    __extends(PurchasesController, _super);
    function PurchasesController() {
        _super.call(this);
    }
    PurchasesController.prototype.buy = function (_, res) {
        res.render('buy', {});
        return Promise.resolve(null);
    };
    PurchasesController.prototype.confirm = function (req, res) {
        var order = req.body.orderData;
        // Create or get user by email
        // Create or get items by SKU
        // Create order with user_id, map of { item: quantity }
        res.json({ received: order });
        return Promise.resolve(null);
    };
    return PurchasesController;
}(baseController_1.BaseController));
exports.PurchasesController = PurchasesController;

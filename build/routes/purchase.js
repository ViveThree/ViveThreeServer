"use strict";
var PurchaseRoutes;
(function (PurchaseRoutes) {
    function buy(_, res) {
        res.render('buy', {});
        return Promise.resolve(null);
    }
    PurchaseRoutes.buy = buy;
    function confirm(req, res) {
        var order = req.body.orderData;
        // Create or get user by email
        // Create or get items by SKU
        // Create order with user_id, map of { item: quantity }
        res.json({ received: order });
        return Promise.resolve(null);
    }
    PurchaseRoutes.confirm = confirm;
})(PurchaseRoutes || (PurchaseRoutes = {}));
module.exports = PurchaseRoutes;

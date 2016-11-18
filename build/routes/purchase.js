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
        res.json({ received: order });
        return Promise.resolve(null);
    }
    PurchaseRoutes.confirm = confirm;
})(PurchaseRoutes || (PurchaseRoutes = {}));
module.exports = PurchaseRoutes;

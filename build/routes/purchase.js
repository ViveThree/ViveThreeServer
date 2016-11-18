"use strict";
var PurchaseRoutes;
(function (PurchaseRoutes) {
    function buy(_, res) {
        res.render('buy', {});
        return Promise.resolve(null);
    }
    PurchaseRoutes.buy = buy;
    function confirm(req, res) {
        console.log("order data", req.body.orderData);
        res.json({ success: true });
        return Promise.resolve(null);
    }
    PurchaseRoutes.confirm = confirm;
})(PurchaseRoutes || (PurchaseRoutes = {}));
module.exports = PurchaseRoutes;

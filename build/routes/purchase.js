"use strict";
var PurchaseRoutes;
(function (PurchaseRoutes) {
    function buy(_, res) {
        res.render('buy', {});
        return Promise.resolve(null);
    }
    PurchaseRoutes.buy = buy;
})(PurchaseRoutes || (PurchaseRoutes = {}));
module.exports = PurchaseRoutes;

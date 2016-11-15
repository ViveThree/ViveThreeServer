"use strict";
var StaticRoutes;
(function (StaticRoutes) {
    function index(_, res, next) {
        res.send("This works!");
        next();
    }
    StaticRoutes.index = index;
})(StaticRoutes || (StaticRoutes = {}));
module.exports = StaticRoutes;

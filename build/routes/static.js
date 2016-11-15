"use strict";
var Promise = require("bluebird");
var StaticRoutes;
(function (StaticRoutes) {
    function index(_, res) {
        res.render('index', {});
        return Promise.resolve(null);
    }
    StaticRoutes.index = index;
    function about(_, res) {
        res.render('about', {});
        return Promise.resolve(null);
    }
    StaticRoutes.about = about;
})(StaticRoutes || (StaticRoutes = {}));
module.exports = StaticRoutes;

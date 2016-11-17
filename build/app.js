"use strict";
// import * as bodyParser from "body-parser";
var express = require("express");
var StaticRoutes = require("./routes/static");
var PurchaseRoutes = require("./routes/purchase");
var UserRoutes = require("./routes/user");
var path = require("path");
var Server = (function () {
    function Server() {
        var app = express();
        var router = express.Router();
        router.get("/", this.promisifyRoute(StaticRoutes.index));
        router.get("/about", this.promisifyRoute(StaticRoutes.about));
        router.get("/buy", this.promisifyRoute(PurchaseRoutes.buy));
        router.get("/login", this.promisifyRoute(UserRoutes.login));
        app.use("/static/js", express.static(path.join(__dirname, '../build/client')));
        app.use("/static", express.static(path.join(__dirname, '../static')));
        app.use("/vendor", express.static(path.join(__dirname, '../vendor')));
        app.use(router);
        app.set('views', './views');
        app.set('view engine', 'pug');
        var port = app.get('port') || 8080;
        app.set('port', port);
        app.listen(port, function () {
            console.log("Running on port " + port + "!");
        });
    }
    // Convert our promise-based routes back to express-compatible callback functions
    Server.prototype.promisifyRoute = function (routeFn) {
        return function (req, res, next) {
            routeFn(req, res).then(function (_) {
                next();
            });
        };
    };
    return Server;
}());
new Server();

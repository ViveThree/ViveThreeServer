"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var StaticRoutes = require("./routes/static");
var PurchaseRoutes = require("./routes/purchase");
var UserRoutes = require("./routes/user");
var path = require("path");
var Server = (function () {
    function Server() {
        var app = express();
        var router = express.Router();
        // Middleware
        app.use(bodyParser.json()); // for parsing application/json
        app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        // Routes
        router.get("/", this.promisifyRoute(StaticRoutes.index));
        router.get("/about", this.promisifyRoute(StaticRoutes.about));
        router.get("/login", this.promisifyRoute(UserRoutes.login));
        router.get("/buy", this.promisifyRoute(PurchaseRoutes.buy));
        var corsOptions = {
            origin: "https://shop.trycelery.com",
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        };
        router.options("/confirm", cors(corsOptions));
        router.post("/confirm", cors(corsOptions), this.promisifyRoute(PurchaseRoutes.confirm));
        // Static Routes
        app.use("/static/js", express.static(path.join(__dirname, '../build/client')));
        app.use("/static", express.static(path.join(__dirname, '../static')));
        app.use("/vendor", express.static(path.join(__dirname, '../vendor')));
        app.use(router);
        app.set('views', './views');
        app.set('view engine', 'pug');
        var port = process.env.PORT || 8080;
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

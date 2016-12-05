"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var cors = require("cors");
var Promise = require("bluebird");
var path = require("path");
var staticsController_1 = require("./controllers/staticsController");
var PurchasesController_1 = require("./controllers/PurchasesController");
var UsersController_1 = require("./controllers/UsersController");
function start() {
    return Promise
        .resolve(express())
        .then(function (app) {
        var router = express.Router();
        // Middleware and options
        app.set('views', path.join(__dirname, '../views'));
        app.set('view engine', 'pug');
        app.set("etag", false);
        app.disable("x-powered-by");
        app.use(cookieParser());
        app.use(session({ secret: 'we love haircare' }));
        app.use(bodyParser.json()); // for parsing application/json
        app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        app.use(function (req, _, next) {
            console.log(req.method + " " + req.url + " - " + req.ip);
            next();
        });
        // Routes
        var staticsController = new staticsController_1.StaticsController();
        router.get("/", staticsController.index);
        router.get("/about", staticsController.about);
        var usersController = new UsersController_1.UsersController();
        router.get("/login", usersController.login);
        var purchasesController = new PurchasesController_1.PurchasesController();
        router.get("/buy", purchasesController.buy);
        var corsOptions = {
            origin: "https://shop.trycelery.com",
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        };
        router.options("/confirm", cors(corsOptions));
        router.post("/confirm", cors(corsOptions), purchasesController.confirm);
        // Static Routes
        app.use("/static/js", express.static(path.join(__dirname, '../build/client')));
        app.use("/static", express.static(path.join(__dirname, '../static')));
        app.use("/vendor", express.static(path.join(__dirname, '../vendor')));
        app.use(router);
        return app;
    }).then(function (app) {
        return new Promise(function (resolve) {
            var port = process.env.PORT || 8080;
            app.set('port', port);
            var server = app.listen(port, function () {
                console.log("Running on port " + port + "!");
                resolve(server);
            });
        });
    });
}
start();

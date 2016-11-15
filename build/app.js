"use strict";
// import * as bodyParser from "body-parser";
var express = require("express");
var StaticRoutes = require("./routes/static");
var Server = (function () {
    function Server() {
        this.app = express();
        var router = express.Router();
        router.get("/", StaticRoutes.index);
        this.app.use(router);
        this.app.listen(8080, function () {
            console.log("Running on port 8080!");
        });
    }
    return Server;
}());
new Server();

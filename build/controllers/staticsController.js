"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Promise = require("bluebird");
var baseController_1 = require("./baseController");
var StaticsController = (function (_super) {
    __extends(StaticsController, _super);
    function StaticsController() {
        _super.call(this);
    }
    StaticsController.prototype.index = function (_, res) {
        res.render('index', {});
        return Promise.resolve(null);
    };
    StaticsController.prototype.about = function (_, res) {
        res.render('about', {});
        return Promise.resolve(null);
    };
    return StaticsController;
}(baseController_1.BaseController));
exports.StaticsController = StaticsController;

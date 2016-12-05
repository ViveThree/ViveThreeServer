"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Promise = require("bluebird");
var baseController_1 = require("./baseController");
var UsersController = (function (_super) {
    __extends(UsersController, _super);
    function UsersController() {
        _super.call(this);
    }
    UsersController.prototype.login = function (_, res) {
        res.render('login', {});
        return Promise.resolve(null);
    };
    return UsersController;
}(baseController_1.BaseController));
exports.UsersController = UsersController;

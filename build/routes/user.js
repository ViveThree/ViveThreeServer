"use strict";
var Promise = require("bluebird");
var UserRoutes;
(function (UserRoutes) {
    function login(_, res) {
        res.render('login', {});
        return Promise.resolve(null);
    }
    UserRoutes.login = login;
})(UserRoutes || (UserRoutes = {}));
module.exports = UserRoutes;

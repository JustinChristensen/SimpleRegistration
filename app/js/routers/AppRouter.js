define(function (require) {
    "use strict";

    var BaseRouter = require("routers/BaseRouter");
    var action = require("action");

    var AppRouter = BaseRouter.extend({

        routes: {
            "": "login",
            "register": "register",
            "users": "users"
        },

        login: function () {
            action(action.AM.get("LOGIN"));
        },

        register: function () {
            action(action.AM.get("REGISTER"));
        },

        users: function () {
            action(action.AM.get("USERS"));
        }

    });

    return AppRouter;

});

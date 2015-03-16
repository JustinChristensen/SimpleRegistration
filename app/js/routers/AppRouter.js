define(function (require) {

    var BaseRouter = require("routers/BaseRouter");
    var action = require("action");

    var AppRouter = BaseRouter.extend({

        routes: {
            "": "login",
            "register": "register",
            "users": "users"
        },

        login: function () {
            action(action.LOGIN);
        },

        register: function () {
            action(action.REGISTER);
        },

        users: function () {
            action(action.USERS);
        }

    });

    return AppRouter;

});

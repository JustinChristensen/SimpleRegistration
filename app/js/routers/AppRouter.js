define(function (require) {

    var Backbone = require("backbone");
    var action = require("action");

    var AppRouter = Backbone.Router.extend({

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

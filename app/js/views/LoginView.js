define(function (require) {
    "use strict";

    var BaseView = require("views/BaseView");

    var LoginView = BaseView.extend({

        tagName: "div",
        className: "login",

        initialize: function (options) {
            BaseView.prototype.initialize.apply(this, arguments);
        },

        render: function () {
            return this;
        }

    });

    return LoginView;

});

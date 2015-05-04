define(function (require) {
    "use strict";

    var BaseView = require("views/BaseView");

    var AppView = BaseView.extend({

        tagName: "div",
        className: "app",

        initialize: function (options) {
            BaseView.prototype.initialize.apply(this, arguments);
        },

        render: function () {
            return this;
        }

    });

    return AppView;

});

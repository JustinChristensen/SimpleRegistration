define(function (require) {
    "use strict";

    var BaseView = require("views/BaseView");
    var appTemplate = require("templates/app");

    var AppView = BaseView.extend({

        tagName: "div",
        className: "app",

        template: appTemplate,

        initialize: function (options) {
            BaseView.prototype.initialize.apply(this, arguments);
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return AppView;

});

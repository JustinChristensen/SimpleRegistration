define(function (require) {

    var Backbone = require("backbone");
    var appTemplate = require("templates/app");

    var AppView = Backbone.View.extend({

        tagName: "div",
        className: "app",

        template: appTemplate,

        render: function () {
            return this;
        }

    });

    return AppView;

});

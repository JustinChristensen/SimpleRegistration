define(function (require) {

    var Backbone = require("backbone");
    var appNavTemplate = require("templates/appNav");

    var AppNavView = Backbone.View.extend({

        tagName: "nav",
        className: "app-nav",

        template: appNavTemplate,

        events: {
            "click a": "navigate"
        },

        initialize: function (options) {
            this.router = options.router;
        },

        render: function () {
            var rendered = this.template();
            this.$el.html(rendered);

            return this;
        },

        navigate: function (e) {
            var $this = this.$(e.currentTarget);
            var path = $this.attr("href");

            this.router.navigate(path, {
                trigger: true,
                replace: true
            });
        }

    });

    return AppNavView;

});

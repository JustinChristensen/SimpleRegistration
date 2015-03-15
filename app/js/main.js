define(function (require) {

    require("config");

    require(["action", "backbone"], function (action, Backbone) {
        action(action.MAIN).then(function () {
            Backbone.history.start({ pushState: true });
        });
    });

});

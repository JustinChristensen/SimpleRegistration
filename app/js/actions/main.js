define(function (require) {
    "use strict";

    var Backbone = require("backbone");
    var AppView = require("views/AppView");
    var AppRouter = require("routers/AppRouter");

    return function (appState, data) {
        var appView = new AppView();
        var appRouter = new AppRouter();

        Backbone.history.start({
            pushState: true
        });

        appView.render();

        appState.appView = appView;
        appState.appRouter = appRouter;
    };

});

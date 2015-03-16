define(function (require) {

    var AppView = require("views/AppView");
    var AppNavView = require("views/AppNavView");
    var AppRouter = require("routers/AppRouter");

    return function (appState, data) {
        // kick this off right away
        var appRouter = new AppRouter();
        Backbone.history.start({ pushState: true });

        var appNavView = new AppNavView({
            router: appRouter
        });

        var appView = new AppView();

        appNavView.render();
        appView.render();
    };

});

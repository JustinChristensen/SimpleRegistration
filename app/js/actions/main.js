define(function (require) {

    var AppView = require("views/AppView");
    var AppNavView = require("views/AppNavView");
    var AppRouter = require("routers/AppRouter");

    return function (appState, data) {
        var appRouter = new AppRouter();

        var appNavView = new AppNavView({
            router: appRouter
        });

        var appView = new AppView();

        appNavView.render();
        appView.render();

        appState.appRouter = appRouter;
        appState.appNavView = appNavView;
        appState.appView = appView;
    };

});

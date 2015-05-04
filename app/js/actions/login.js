define(function (require) {
    "use strict";

    var LoginView = require("views/LoginView");

    return function (appState, data) {
        var loginView = new LoginView();
        loginView.render();
    };

});

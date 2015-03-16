define(function (require) {

    require("config");
    require("action");

    require(["action"], function (action) {
        action(action.MAIN);
    });

});

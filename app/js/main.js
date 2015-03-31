define(function (require) {
    "use strict";

    require("config");
    require("action");

    require(["action"], function (action) {
        action(action.AM.get("MAIN"));
    });

});

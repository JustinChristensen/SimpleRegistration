define(function (require) {

    var _ = require("underscore");
    var ImmutableMap = require("immutable").Map;
    var Promise = require("promise").Promise;

    function ApplicationState() {}

    var appState = new ApplicationState();

    function action(path, data, options) {
        data = data || {};
        options = options || {};

        return new Promise(function (resolve, reject) {
            if (_.isString(path)) {

                require([path], function (actionFn) {
                    if (_.isFunction(actionFn)) {
                        if (!options.defer) {
                            actionFn.call(this, appState, data);
                        }

                        resolve(actionFn);
                    }
                    else {
                        reject(new TypeError("Required action must export a function"));
                    }
                }, function (error) {
                    reject(error);
                });

            }
            else {
                reject(new TypeError("Action path must be a string"));
            }
        });
    }

    var actionMap = new ImmutableMap({
        "MAIN": "actions/main",
        "LOGIN": "actions/login",
        "REGISTER": "actions/register",
        "USERS": "actions/users"
    });

    return Object.defineProperty(action, "AM", {
        value: actionMap
    });

});

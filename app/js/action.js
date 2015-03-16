define(function (require) {

    var _ = require("underscore");
    var Promise = require("promise").Promise;

    function ApplicationState() {}

    var appState = new ApplicationState();

    function action(path, data, options) {
        data = data || {};
        options = options || {};

        return new Promise(function (resolve, reject) {
            require([path], function (actionFn) {
                if (!options.defer) {
                    actionFn.call(this, appState, data);
                }

                resolve();
            }, function (error) {
                reject(error);
            });
        });
    }

    return _.extend(action, {
        "MAIN": "actions/main",
        "LOGIN": "actions/login",
        "REGISTER": "actions/register",
        "USERS": "actions/users"
    });

});

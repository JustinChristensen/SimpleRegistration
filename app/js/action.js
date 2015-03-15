define(function (require) {

    var _ = require("underscore");
    var Promise = require("promise").Promise;

    function ApplicationState() {}

    var appState = new ApplicationState();

    var actions = {
        "MAIN": "actions/main",
        "LOGIN": "actions/login",
        "REGISTER": "actions/register",
        "USERS": "actions/users"
    };

    var paths = _.invert(actions);

    function action(path, data) {
        return new Promise(function (resolve, reject) {
            require([path], function (actionFn) {
                // action.previous = action.current;
                // action.current = paths[path];
                actionFn.call(this, appState, data);
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    }

    return _.extend(action, actions);

});

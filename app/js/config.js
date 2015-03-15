require.config({
    paths: {
        "jquery": "../vendor/jquery/dist/jquery",
        "bootstrap": "../vendor/bootstrap-sass-official/assets/javascripts/bootstrap",
        "underscore": "../vendor/lodash/lodash",
        "backbone": "../vendor/backbone/backbone",
        "handlebars": "../vendor/handlebars/handlebars.runtime",
        "promise": "../vendor/es6-promise/promise"
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    }
});

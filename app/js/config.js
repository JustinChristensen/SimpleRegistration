require.config({
    paths: {
        "affix": "../vendor/bootstrap-sass-official/assets/javascripts/bootstrap/affix",
        "alert": "../vendor/bootstrap-sass-official/assets/javascripts/bootstrap/alert",
        "button": "../vendor/bootstrap-sass-official/assets/javascripts/bootstrap/button",
        "carousel": "../vendor/bootstrap-sass-official/assets/javascripts/bootstrap/carousel",
        "collapse": "../vendor/bootstrap-sass-official/assets/javascripts/bootstrap/collapse",
        "dropdown": "../vendor/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown",
        "modal": "../vendor/bootstrap-sass-official/assets/javascripts/bootstrap/modal",
        "popover": "../vendor/bootstrap-sass-official/assets/javascripts/bootstrap/popover",
        "scrollspy": "../vendor/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy",
        "tab": "../vendor/bootstrap-sass-official/assets/javascripts/bootstrap/tab",
        "tooltip": "../vendor/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip",
        "transition": "../vendor/bootstrap-sass-official/assets/javascripts/bootstrap/transition",
        "jquery": "../vendor/jquery/dist/jquery",
        "underscore": "../vendor/lodash/lodash",
        "backbone": "../vendor/backbone/backbone",
        "handlebars": "../vendor/handlebars/handlebars.runtime",
        "promise": "../vendor/es6-promise/promise",
        "immutable": "../vendor/immutable/dist/immutable"
    },
    shim: {
        "affix": {
            deps: ["jquery"]
        },
        "alert": {
            deps: ["jquery"]
        },
        "button": {
            deps: ["jquery"]
        },
        "carousel": {
            deps: ["jquery"]
        },
        "collapse": {
            deps: ["jquery", "transition"]
        },
        "dropdown": {
            deps: ["jquery"]
        },
        "modal": {
            deps: ["jquery"]
        },
        "popover": {
            deps: ["jquery", "tooltip"]
        },
        "scrollspy": {
            deps: ["jquery"]
        },
        "tab": {
            deps: ["jquery"]
        },
        "tooltip": {
            deps: ["jquery"]
        },
        "transition": {
            deps: ["jquery"]
        },
    }
});

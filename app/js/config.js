require.config({
    paths: {
        "affix": "../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix",
        "alert": "../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert",
        "button": "../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button",
        "carousel": "../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel",
        "collapse": "../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse",
        "dropdown": "../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown",
        "modal": "../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal",
        "popover": "../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover",
        "scrollspy": "../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy",
        "tab": "../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab",
        "tooltip": "../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip",
        "transition": "../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition",
        "jquery": "../bower_components/jquery/dist/jquery",
        "underscore": "../bower_components/lodash/lodash",
        "backbone": "../bower_components/backbone/backbone",
        "handlebars": "../bower_components/handlebars/handlebars.runtime",
        "promise": "../bower_components/es6-promise/promise",
        "immutable": "../bower_components/immutable/dist/immutable"
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

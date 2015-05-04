"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")(); // requires gulp-* prefixed plugins in package.json
var pageSpeed = require("psi");
var requirejs = require("requirejs");
var del = require("del");
/* jshint ignore:start */
var Promise = require("es6-promise").Promise;
/* jshint ignore:end */

// arguments
var argv = require("yargs")
    .default("sourcemaps", false)
    .default("dev", false)
    .argv;

// application paths
var paths = {};

paths.app               = "app";
paths.build             = "build";
paths.nodeModules       = "node_modules";
paths.logs              = "logs";
paths.js                = paths.app + "/js";
paths.css               = paths.app + "/css";
paths.bowerComponents   = paths.app + "/bower_components";
paths.compiledTemplates = paths.js + "/templates";
paths.buildComponents   = paths.build + "/bower_components";
paths.buildWhiteList    = [
    paths.buildComponents + "/!(requirejs|bootstrap-sass-official)",
    paths.buildComponents + "/bootstrap-sass-official/!(assets)",
    paths.buildComponents + "/bootstrap-sass-official/assets/!(fonts)"
];

// globbing patterns
var filesets = {};

filesets.sass           = paths.app + "/sass/**/*.scss";
filesets.templates      = paths.app + "/templates/**/*.hbs";
filesets.css            = paths.app + "/css/**/*.css";
filesets.js             = paths.app + "/js/**/*.js";
filesets.logs           = paths.logs + "/**/*.log";
filesets.jshint         = [
    paths.app + "/js/!(templates)/**/*.js",
    paths.app + "/js/*.js"
];
filesets.html           = paths.app + "/**/*.html";
filesets.buildJs        = paths.buildComponents + "/**/*.js";

var createFormat = $.util.colors.green("CREATE") + " %s";
var deleteFormat = $.util.colors.red("DELETE") + " %s";

// helper functions
function logArray(arr, format) {
    var i, len;

    if (arr && arr.length) {
        for (i = 0, len = arr.length; i < len; i++) {
            console.log(format, arr[i]);
        }
    }
}

function logCreatedFiles(paths) {
    logArray(paths, createFormat);
}

function logDeletedFiles(paths) {
    logArray(paths, deleteFormat);
}

// tasks
gulp.task("default", [
    "watch"
]);

gulp.task("jshint", function () {
    return gulp.src(filesets.jshint)
        .pipe($.jshint())
        .pipe($.jshint.reporter("jshint-stylish"));
});

gulp.task("csslint", function () {

});

gulp.task("check-style", function () {

});

gulp.task("page-speed", function () {

});

gulp.task("docs", function () {

});

gulp.task("dependencies", function () {

});

gulp.task("optimize-images", function () {

});

gulp.task("compile-templates", function () {
    return gulp.src(filesets.templates)
        .pipe($.changed(paths.compiledTemplates, {
            extension: ".js"
        }))
        .pipe($.handlebars())
        .pipe($.defineModule("amd"))
        .pipe(gulp.dest(paths.compiledTemplates));
});

gulp.task("compile-sass", function () {
    var sassConfig = {
        includePaths: [
            paths.bowerComponents + "/bootstrap-sass-official/assets/stylesheets",
            paths.bowerComponents + "/spinkit/scss"
        ],
        sourceComments: true
    };

    var supportedBrowsers = [
      "ie >= 8",
      "ie_mob >= 10",
      "ff >= 30",
      "chrome >= 34",
      "safari >= 7",
      "opera >= 23",
      "ios >= 7",
      "android >= 4",
      "bb >= 10"
    ];

    return gulp.src(filesets.sass)
        .pipe($.if(argv.sourcemaps, $.sourcemaps.init()))
        .pipe($.sass(sassConfig))
        .pipe($.autoprefixer(supportedBrowsers))
        .pipe($.if(argv.sourcemaps, $.sourcemaps.write(".", {
            addComment: false
        })))
        .pipe(gulp.dest(paths.css));
});

gulp.task("compile", ["compile-templates", "compile-sass"]);

gulp.task("build", ["compile"], function () {
    return new Promise(function (resolve, reject) {
        var buildConfig = require("./config/build");

        requirejs.optimize(buildConfig, function (buildResponse) {
            console.log($.util.colors.green("Build Report"));

            console.log(buildResponse);

            del(paths.buildWhiteList, function (error, deletedPaths) {
                if (!error) {
                    $.util.log($.util.colors.red("Deleting bower components."));

                    logDeletedFiles(deletedPaths);

                    gulp.src(filesets.buildJs)
                        .pipe($.uglify())
                        .pipe(gulp.dest(paths.buildComponents));

                    $.util.log($.util.colors.green("Build successful. Check build.txt for details."));

                    resolve();
                }
                else {
                    reject(error);
                }
            });
        }, function (error) {
            reject(error);
        });
    });
});

gulp.task("check-build", function () {

});

gulp.task("publish", function () {

});

gulp.task("clean", function () {
    return new Promise(function (resolve, reject) {
        del([
            paths.build,
            paths.css,
            paths.compiledTemplates,
            filesets.logs
        ], function (error, deletedPaths) {
            if (!error) {
                logDeletedFiles(deletedPaths);
                resolve();
            }
            else {
                reject(error);
            }
        });
    });
});

gulp.task("watch-sass", function () {
    gulp.watch(filesets.sass, ["compile-sass"]);
});

gulp.task("watch-templates", function () {
    gulp.watch(filesets.templates, ["compile-templates"]);
});

gulp.task("watch", [
    "watch-sass",
    "watch-templates"
]);

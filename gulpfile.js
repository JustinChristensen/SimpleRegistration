"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")(); // requires gulp-* prefixed plugins in package.json
var pageSpeed = require("psi");
var browserSync = require("browser-sync");
var requirejs = require("requirejs");
var through2 = require("through2");
var morgan = require("morgan");
var del = require("del");
var runSequence = require("run-sequence");
/* jshint ignore:start */
var Promise = require("es6-promise").Promise;
/* jshint ignore:end */
var reload = browserSync.reload;

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
paths.js                = paths.app + "/js";
paths.css               = paths.app + "/css";
paths.vendor            = paths.app + "/vendor";
paths.compiledTemplates = paths.js + "/templates";
paths.buildVendor       = paths.build + "/vendor";
paths.buildWhiteList    = [
    paths.buildVendor + "/!(requirejs|bootstrap-sass-official)",
    paths.buildVendor + "/bootstrap-sass-official/!(assets)",
    paths.buildVendor + "/bootstrap-sass-official/assets/!(fonts)"
];

// globbing patterns
var filesets = {};

filesets.sass           = paths.app + "/sass/**/*.scss";
filesets.templates      = paths.app + "/templates/**/*.hbs";
filesets.css            = paths.app + "/css/**/*.css";
filesets.js             = paths.app + "/js/**/*.js";
filesets.jshint         = [
    paths.app + "/js/!(templates)/**/*.js",
    paths.app + "/js/*.js"
];
filesets.html           = paths.app + "/**/*.html";
filesets.buildVendorJs  = paths.buildVendor + "/**/*.js";

// helper functions
function logDeleted(title, paths) {
    if (paths && paths.length) {
        $.util.log($.util.colors.green(title));
        console.log(paths.join("\n") + "\n");
    }
}

// tasks
gulp.task("default", [
    "watch",
    "serve"
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

gulp.task("coverage", function () {

});

gulp.task("test", function () {

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
            paths.vendor + "/bootstrap-sass-official/assets/stylesheets"
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

gulp.task("build", ["compile-templates", "compile-sass"], function () {
    return new Promise(function (resolve, reject) {
        var buildConfig = require("./config/build");

        requirejs.optimize(buildConfig, function (buildResponse) {
            $.util.log($.util.colors.green("Build Successful!"));
            console.log(buildResponse);

            $.util.log($.util.colors.gray("Deleting packaged bower components..."));

            del(paths.buildWhiteList, function (error, deletedPaths) {
                if (!error) {
                    logDeleted("Deleted the following files and directories:", deletedPaths);

                    $.util.log($.util.colors.gray("Optimizing remaining bower components..."));

                    gulp.src(filesets.buildVendorJs)
                        .pipe($.uglify())
                        .pipe(gulp.dest(paths.buildVendor));

                    $.util.log($.util.colors.green("Bower components optimized!"));

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
    $.util.log("Cleaning...");

    return new Promise(function (resolve, reject) {
        del([
            paths.build,
            paths.css,
            paths.compiledTemplates
        ], function (error, deletedPaths) {
            if (!error) {
                logDeleted("Clean successful!", deletedPaths);
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

gulp.task("serve", function () {
    var serverOptions = {
        server: {
            baseDir: "build"
        },
        port: 3000,
        logSnippet: false,
        open: false,
        notify: false
    };

    if (argv.dev) {
        serverOptions.server.baseDir = "app";
        serverOptions.server.middleware = morgan("dev");
        serverOptions.files = [
            filesets.js,
            filesets.css,
            filesets.html
        ];
    }

    browserSync(serverOptions);
});

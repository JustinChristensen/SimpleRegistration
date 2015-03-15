var gulp = require("gulp");
var $ = require("gulp-load-plugins")(); // requires gulp-* prefixed plugins in package.json
var pageSpeed = require("psi");
var browserSync = require("browser-sync");
var requirejs = require("requirejs");
var through2 = require("through2");
var morgan = require("morgan");
/* jshint ignore:start */
var Promise = require("es6-promise").Promise;
/* jshint ignore:end */
var reload = browserSync.reload;

// application paths
var paths = {};

paths.app               = "app";
paths.build             = "build";
paths.nodeModules       = "node_modules";
paths.js                = paths.app + "/js";
paths.css               = paths.app + "/css";
paths.vendor            = paths.app + "/vendor";
paths.compiledTemplates = paths.js + "/templates";
paths.requireExclude    = paths.build + "/vendor" + "/!(requirejs)";

// globbing patterns
var filesets = {};

filesets.sass           = paths.app + "/sass/**/*.scss";
filesets.templates      = paths.app + "/templates/**/*.hbs";
filesets.css            = paths.app + "/css/**/*.css";
filesets.js             = paths.app + "/js/**/*.js";
filesets.html           = paths.app + "/**/*.html";

/**
 * Task Summary:
 *
 * default              Development task. Watches filesystem for changes, compiles sass files, templates, run tests, and lints, and runs a server
 * jshint               Checks that established Javascript best practices are followed
 * csslint              Checks that established CSS best practices are followed
 * check-style          Checks that application Javascript follows established style
 * check-page-speed     Runs Google's page speed analyzer and reports areas for performance improvements
 * check-coverage       Runs coverage analysis and generates a test coverage report
 * check-complexity     Runs a complexity analysis using plato and generates a complexity report
 * check-build          Verifies that the built directory contains the correct subdirectories and files, and only those files and directories
 * test                 Runs the unit tests for this application one time
 * docs                 Generates documentation using (TODO: pick doc generator)
 * dependencies         Generates a dependency graph for RequireJS
 * optimize-images      Optimizes images. Part of the build system
 * compile-templates    Compiles Handlebars templates from /templates to /js/templates
 * compile-sass         Compiles SASS to stylesheets from /sass to /css. Also runs the autoprefixer on the generated CSS
 * build                Runs tests, compiles templates, SASS, optimizes images, runs the requirejs optimizer, and then checks the build
 * publish              Publishes front-end resources to the CDN
 * clean                Removes all generated files. This includes compiled templates, CSS, and the build folder
 * maintainer-clean     Runs clean and also deletes node_modules and all bower dependencies (npm install and bower install to re-install them)
 * watch                Watches the filesystem for changes and compiles, tests, and reloads things
 * serve                Serve the app directory
 * serve-build          Serve the build directory
 */

gulp.task("default", []);

gulp.task("jshint", function () {

});

gulp.task("csslint", function () {

});

gulp.task("check-style", function () {

});

gulp.task("check-page-speed", function () {

});

gulp.task("check-coverage", function () {

});

gulp.task("check-complexity", function () {

});

gulp.task("check-build", function () {

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
        .pipe($.sourcemaps.init())
        .pipe($.sass(sassConfig))
        .pipe($.autoprefixer(supportedBrowsers))
        .pipe($.sourcemaps.write(".", {
            addComment: false
        }))
        .pipe(gulp.dest(paths.css));
});

gulp.task("build", ["compile-templates", "compile-sass"], function () {
    return new Promise(function (resolve, reject) {
        var buildConfig = require("./config/build");

        requirejs.optimize(buildConfig, function (buildResponse) {
            $.util.log(buildResponse);
            resolve();
        }, function (error) {
            reject(error);
        });
    });
});

gulp.task("publish", function () {

});

gulp.task("maintainer-clean", ["clean"], function () {
    // var promises = [];
    // var directories = [
    //     paths.nodeModules,
    //     paths.vendor
    // ];
});

gulp.task("clean", function () {
    // var promises = [];
    // var directories = [
    //     paths.build,
    //     paths.css,
    //     paths.compiledTemplates
    // ];
});

gulp.task("watch", ["compile-templates", "compile-sass"], function () {
    gulp.watch(filesets.templates, ["compile-templates"]);
    gulp.watch(filesets.sass, ["compile-sass"]);
});

gulp.task("serve", function () {
    browserSync({
        server: {
            baseDir: "app",
            middleware: morgan("dev")
        },
        port: 3000,
        logSnippet: false,
        open: false,
        notify: false,
        files: [
            filesets.js,
            filesets.css,
            filesets.html
        ]
    });
});

gulp.task("serve-build", function () {
    browserSync({
        server: {
            baseDir: "build"
        },
        port: 3000,
        logSnippet: false,
        open: false,
        notify: false
    });
});

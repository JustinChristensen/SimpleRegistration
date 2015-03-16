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
var del = require("del");
var reload = browserSync.reload;

// arguments
var argv = require("yargs")
    .default("sourcemaps", false)
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
filesets.html           = paths.app + "/**/*.html";
filesets.buildVendorJs  = paths.buildVendor + "/**/*.js";

// helper functions
function logDeleted(title, paths) {
    if (paths && paths.length) {
        $.util.log($.util.colors.green(title));
        console.log(paths.join("\n") + "\n");
    }
}

/**
 * Task Summary:
 *
 * default              Development task. Watches filesystem for changes, and performs a variety of tasks automatically
 * jshint               Checks that established Javascript best practices are followed
 * csslint              Checks that established CSS best practices are followed
 * check-style          Checks that application Javascript follows established style
 * page-speed           Runs Google's page speed analyzer and reports areas for performance improvements
 * coverage             Runs coverage analysis and generates a test coverage report
 * complexity           Runs a complexity analysis using plato and generates a complexity report
 * test                 Runs the unit tests for this application one time
 * docs                 Generates documentation using (TODO: pick doc generator)
 * dependencies         Generates a dependency graph for RequireJS
 * optimize-images      Optimizes image resources
    * compile-templates    Compiles Handlebars templates from /templates to /js/templates
    * compile-sass         Compiles SASS to stylesheets from /sass to /css. Also runs the autoprefixer on the generated CSS. Optionally generates sourcemaps.
 * build                Runs tests, compiles templates, SASS, optimizes images, runs the requirejs optimizer, and then checks the build
 * buildcheck           Verifies that the built directory contains the correct subdirectories and files, and only those files and directories
 * publish              Gzip's and publishes front-end resources to the CDN
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

gulp.task("page-speed", function () {

});

gulp.task("coverage", function () {

});

gulp.task("complexity", function () {

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

            $.util.log($.util.colors.green("Deleting unwanted bower components..."));

            del(paths.buildWhiteList, function (error, deletedPaths) {
                if (!error) {
                    logDeleted("Delete successful!", deletedPaths);

                    $.util.log($.util.colors.green("Optimizing remaining bower components..."));

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

gulp.task("maintainer-clean", ["clean"], function () {
    $.util.log("Cleaning...");

    return new Promise(function (resolve, reject) {
        del([
            paths.nodeModules,
            paths.vendor
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

gulp.task("watch", function () {
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

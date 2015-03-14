var gulp = require("gulp");
var sass = require("gulp-sass");
var handlebars = require("gulp-handlebars");
var defineModule = require("gulp-define-module");
var requirejs = require("requirejs");

var paths = {};
paths.app = "app";
paths.scss = paths.app + "/sass/**/*.scss";
paths.templates = paths.app + "/templates/**/*.hbs";

gulp.task("server", function () {

});

gulp.task("compile-templates", function () {

});

gulp.task("compile-sass", function () {
    gulp.src(paths.)
});

gulp.task("build", function () {

});

gulp.task("watch", function () {

});

gulp.task("default", []);

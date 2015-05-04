"use strict";

var packageManifest = require("./package");
var express = require("express");
var morgan = require("morgan");
var engines = require("consolidate");
var fs = require("fs");

var argv = require("yargs")
    .usage("Usage: $0 [options]")
    .option("host", {
        describe: "Server host name or ip address",
        default: "localhost"
    })
    .option("p", {
        alias: "port",
        describe: "Server port",
        default: 3000
    })
    .option("log-stdout", {
        describe: "Log to stdout instead of a log file",
        default: false
    })
    .option("env", {
        describe: "Application environment",
        default: process.env.NODE_ENV || "development"
    })
    .version(packageManifest.version, "version", "Print version number")
    .help("help", "Prints available options and copyright info")
    .epilogue([
        "Copyright (C) 2015 " + packageManifest.author.name + "\n",
        "License GPLv3+ GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>",
        "This is free software: you are free to change and redistribute it.",
        "There is NO WARRANTY, to the extent permitted by law."
    ].join("\n"))
    .argv;

var app = express();
// var templates = fs.readdirSync("app/templates");
var publicDir, accessLogStream, logFilePath;

app.engine("hbs", engines.handlebars);

// set env from either NODE_ENV or --env flag
app.set("env", argv.env);

// disable x-powered-by header
app.set("x-powered-by", false);

// view settings
app.set("views", "app/templates");
app.set("view engine", "hbs");

// set up logging
if (argv.logStdout) {
    app.use("/", morgan("dev"));
}
else {
    logFilePath = __dirname + "/logs/" + app.get("env") + ".log";

    accessLogStream = fs.createWriteStream(logFilePath, {
        flags: "a"
    });

    app.use("/", morgan("combined", {
        stream: accessLogStream
    }));
}

// set our public directory
if (app.get("env") === "development") {
    publicDir = "app";
}
else {
    publicDir = "build";
}

app.use("/", express.static(publicDir));

// set locals
app.locals.title = "Simple Registration";

// register all templates as handlebars partials
// app.locals.partials = {};

// templates.forEach(function (template) {
//     var templateName = path.basename(template, path.extname(template));
//     app.locals.partials[templateName] = templateName;
// });

// routes
app.use("/", require("./routes/login"));
app.use("/register", require("./routes/register"));
app.use("/users", require("./routes/users"));

// start the server
app.listen(argv.port, argv.host).on("listening", function () {
    var addr = this.address();
    var format = "Server started and listening on %s:%s...";
    console.log(format, addr.address, addr.port);
    console.log("Serving files from %s", publicDir);
});

module.exports = app;

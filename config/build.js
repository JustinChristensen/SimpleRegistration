module.exports = {
    modules: [
        {
            name: "main",
            include: [
                "affix",
                "alert",
                "button",
                "carousel",
                "collapse",
                "dropdown",
                "modal",
                "popover",
                "scrollspy",
                "tab",
                "tooltip",
                "transition",
                "jquery",
                "underscore",
                "backbone",
                "handlebars",
                "actions/main"
            ]
        },
        {
            name: "actions/login",
            exclude: ["main"]
        },
        {
            name: "actions/register",
            exclude: ["main"]
        },
        {
            name: "actions/users",
            exclude: ["main"]
        }
    ],
    appDir: "app",
    dir: "build",
    baseUrl: "js",
    mainConfigFile: "app/js/config.js",
    optimize: "uglify2",
    skipDirOptimize: true,
    optimizeCss: "standard",
    removeCombined: true,
    preserveLicenseComments: false,
    fileExclusionRegExp: /\.(map|json|hbs|scss|md|txt)$/
};

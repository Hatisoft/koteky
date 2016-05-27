"use strict";
var AppDirectory = require('appdirectory');
var dirs = new AppDirectory({
    appName: "koteky",
    appAuthor: "Hati Software"
});

module.exports.AppPath  = function()
                                {
                                    return dirs.userData();
                                };

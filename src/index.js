var plugins = require('electron-plugins');
var ipc = require('ipc');

document.addEventListener('DOMContentLoaded', function () {
    var context = { document: document };
    plugins.load(context, function (err, loaded) {
        if(err) return console.error(err);
        console.log('Plugins loaded successfully.');
    });
    console.log('should load plugins');
});

ipc.on('update-available', function () {
    console.log('there is an update available for download');
});

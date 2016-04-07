var BrowserWindow = require('browser-window');
var updater = require('electron-updater');
var menubar = require('menubar');

var options = {dir: __dirname, index: 'file://' + __dirname + '/index.html', 'preload-window': true};
var menu = menubar(options);

menu.on('ready', function() {
    /*updater.on('ready', function() {

    });*/
    updater.on('updateRequired', function () {
        menu.app.quit();
    });
    updater.on('updateAvailable', function () {
        if(menu.window)
            menu.window.webContents.send('update-available');
    });
    updater.start();
});

menu.on('after-create-window', function() {
    menu.window.openDevTools({detach:true});
});

var app = require('app');
var ipc = require('ipc');
var util = require('util');
var BrowserWindow = require('browser-window');
var updater = require('electron-updater');

require('crash-reporter').start();

var mainWindow = null;
var loaded = false;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', function() {
    updater.on('ready', function () {
        mainWindow = new BrowserWindow({width: 800, height: 600});
        mainWindow.loadUrl('file://' + __dirname + '/index.html');
        mainWindow.openDevTools({detach:true});
        mainWindow.on('closed', function() {
            mainWindow = null;
        });
    });
    updater.on('updateRequired', function () {
        app.quit();
    });
    updater.on('updateAvailable', function () {
        if(mainWindow)
            mainWindow.webContents.send('update-available');
    });
    updater.start();
});

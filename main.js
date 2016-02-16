var app = require('app');
var BrowserWindow = require('browser-window');
var updater = require('electron-updater');

app.on('ready', function () {
    updater.on('ready', function () {
        mainWindow = new BrowserWindow({width: 800, height: 600});
        mainWindow.loadUrl('file://' + __dirname + '/src/index.html');
        mainWindow.openDevTools({detach:true});
        mainWindow.on('closed', function() {
            mainWindow = null;
        });
    });
    updater.on('updateRequired', function () {
        app.quit();
    });
    updater.on('updateAvailable', function () {
        mainWindow.webContents.send('update-available');
    });
    updater.on('error', function (err) {
        console.log(err);
    });

    var customLogger = {
      log: console.log,
      error: console.error,
      info: console.info,
      warn: console.warn,
      debug: console.debug
    };
    updater.start(customLogger);
});

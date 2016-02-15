var app = require('app');
var path = require('path');
var window = require('electron-window');

app.on('ready', function () {
    var mainWindow = window.createWindow();//{width: 1000, height: 400}
    var someArgs = { data: 'hi' };
    var indexPath = path.resolve(__dirname, 'index.html');
    mainWindow.showUrl(indexPath, someArgs, function () {
        console.log('window is now visible!');
    });
});

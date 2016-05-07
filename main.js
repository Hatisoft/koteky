var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;
var contextMenuBar = electron.Menu;
var updater = require('electron-updater');
var menubar = require('menubar');


var options = {dir: __dirname, index: 'file://' + __dirname + '/index.html', 'preload-window': true};

var menu = menubar(options);

var menuTemplate=[
      {
        label: 'Options',
        click: () => {
            //to be implemented
        }
      },
      {
        label: 'Close',
        click: () => {
              menu.app.quit();
        }
    }];

menu.on('ready', function() {
    updater.on('ready', function() {

        const contextMenu = contextMenuBar.buildFromTemplate(menuTemplate);
          //menu.tray.setToolTip('This is my application.');
          menu.tray.setContextMenu(contextMenu);
    });
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

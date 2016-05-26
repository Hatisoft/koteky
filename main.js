"use strict";
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const contextMenuBar = electron.Menu;
const updater = require('electron-updater');
const menubar = require('menubar');
const ElectronSettings = require('electron-settings');
const path = require('path');


var options = {dir: __dirname, index: 'file://' + __dirname + '/app.html', 'preload-window': true};
var settings = new ElectronSettings();
var windowsSettings = settings.get('window');
if(windowsSettings)
    Object.keys(windowsSettings).forEach(function(key) { options[key] = windowsSettings[key]; });

var menuTemplate=[
      {
        label: 'Settings',
        click: () => {
            menu.window.webContents.send('open-settings');
        }
      },
      {
        label: 'Close',
        click: () => {
            menu.app.quit();
        }
    },
    {
        label: 'Show/Hide',
        click: () => {
            if(menu.window.isVisible())
                menu.window.hide();
            else
                menu.window.show();
    }
}];

var menu = menubar(options);

menu.on('ready', function() {
    updater.on('ready', function() {

        var contextMenu = contextMenuBar.buildFromTemplate(menuTemplate);
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

var savingLoop = true;
menu.app.on('before-quit', (e) => {
    //TODO: remove this Hack to make sure the app closes
    menu.window.webContents.send('finalize');
    if(savingLoop)
        e.preventDefault();
    setTimeout(function() {
        menu.app.quit();
    }, 4000);
});

electron.ipcMain.on('now-close', () => {
    savingLoop = false;
});

electron.ipcMain.on('changed-plugins-settings', () => {
    //updater.check();
});

menu.on('after-create-window', function() {
    menu.window.on('resize', function() {
        settings.set('window.height',  menu.window.getSize()[0]);
        settings.set('window.width',  menu.window.getSize()[1]);
    });
    menu.window.webContents.on('did-finish-load', function() {
        menu.window.webContents.send('initialize');
      });
    menu.window.openDevTools({detach:true});

});

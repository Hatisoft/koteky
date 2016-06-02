"use strict";
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const contextMenuBar = electron.Menu;
const updater = require('electron-updater');
const menubar = require('menubar');
const ElectronSettings = require('electron-settings');
const path = require('path');
const vars = require('./lib/vars');
const open = require("open");

var isDevMode = process.argv.includes('--dev');

if(isDevMode)
    require('electron-reload')(__dirname);

var options = {dir: __dirname, index: 'file://' + __dirname + '/app.html', 'preload-window': true, 'always-on-top': true};
var settings = new ElectronSettings({configDirPath: vars.AppPath()});
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
    menu.window.webContents.on('new-window', function(event, url){
        event.preventDefault();
        open(url);
    });
    var contextMenu = contextMenuBar.buildFromTemplate(menuTemplate);
    menu.tray.setContextMenu(contextMenu);
});

menu.on('after-create-window', function() {

    menu.window.on('resize', function() {
        settings.set('window.height',  menu.window.getSize()[0]);
        settings.set('window.width',  menu.window.getSize()[1]);
    });
    menu.window.webContents.on('did-finish-load', function() {
        updater.update((err) => {
            if (err)
                console.log(err);
            menu.window.webContents.send('initialize');
        });
    });
    if(isDevMode)
        menu.window.openDevTools({detach:true});
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
    updater.update((err) => {
        if (err)
            return;
        menu.window.webContents.send('refresh-posts');
    });
});

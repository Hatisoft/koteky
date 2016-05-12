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
        label: 'Options',
        click: () => {
            const modalPath = path.join('file://', __dirname, '/lib/settings/settings.html');
            let win = new BrowserWindow({ width: 400, height: 320, showDevTools: true });
            win.loadURL(modalPath)
            //to be implemented
        }
      },
      {
        label: 'Close',
        click: () => {
              menu.app.quit();
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

menu.on('after-create-window', function() {
    menu.window.on('resize', function() {
        settings.set('window.height',  menu.window.getSize()[0]);
        settings.set('window.width',  menu.window.getSize()[1]);
    });
    menu.window.on('move', function() {
        settings.set('window.x',  menu.window.getPosition()[0]);
        settings.set('window.y',  menu.window.getPosition()[1]);
    });
    menu.window.on('close', function () {
        if (!menu.window)
            return;
        var bounds = menu.window.getBounds();
        settings.set("window", {
              x: bounds.x,
              y: bounds.y,
              width: bounds.width,
              height: bounds.height
            });
    });
    menu.window.webContents.on('did-finish-load', function() {
        menu.window.webContents.send('initialize', settings);
      });
    menu.window.openDevTools({detach:true});

});

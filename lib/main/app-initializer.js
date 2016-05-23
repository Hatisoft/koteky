"use strict";

const ElectronSettings = require('electron-settings');
const path = require('path');
const fs = require('fs');
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const BrowserWindow = electron.remote.BrowserWindow;

const pluginManager = require('../plugin-manager');
const appModule = require('./app-module');

module.exports  = class AppInitializer{
    constructor(mainWindow) {
        this.pluginManager = new pluginManager();
        this.settings = new ElectronSettings();
        this.localwindow = new BrowserWindow({show: false, webPreferences: {nodeIntegration: false}});

        this.appModule = new appModule([], this.settings, mainWindow, this.localwindow, this.pluginManager);

        ipcRenderer.on('initialize', () => {
            this.initialize();
        });
        ipcRenderer.on('finalize', () => {
            this.finalize();
        });
        ipcRenderer.on('open-settings', () => {
            var settingsWindow = new BrowserWindow({ width: 400, height: 320, showDevTools: true});
            settingsWindow.loadURL('file://' + __dirname + '/../settings/settings.html');
        });
    }

    initialize()
    {
        this.pluginManager.initialize(this.appModule).then(() => {
            this.appModule.initialize();
        });
    }

    finalize()
    {
        this.pluginManager.finalize(this.appModule).then(() => {
            this.appModule.finalize();
            ipcRenderer.send('now-close');
        });
    }
};

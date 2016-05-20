"use strict";

const mainModule = require('./main/main-module');
const pluginManager = require('./plugin-manager');
const ElectronSettings = require('electron-settings');
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const BrowserWindow = electron.remote.BrowserWindow;

let instance = null;

class BootStraper{
    constructor(window) {
        this.settings = new ElectronSettings();
        this.pluginMan = new pluginManager();
        this.localwindow = new BrowserWindow({show: false, webPreferences: {nodeIntegration: false}});

        this.mainModule = new mainModule([], this.settings, window, this.localwindow, this.pluginMan);

        ipcRenderer.on('initialize', () => {
            this.initialize();
        });
        ipcRenderer.on('finalize', () => {
            this.finalize();
        });
    }

    initialize(window)
    {
        this.pluginMan.initialize(this.mainModule).then(() => {
            this.mainModule.initialize();
        });
    }

    finalize()
    {
        this.pluginMan.finalize(this.mainModule).then(() => {
            this.mainModule.finalize();
            ipcRenderer.send('now-close');
        });
    }
}

function GetInstance() {
    if(!instance){
        instance = new BootStraper();
    }
    return instance;
}

module.exports = GetInstance;

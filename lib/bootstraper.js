"use strict";

const viewModel = require('./main/app-view-model');
const model = require('./main/app-model');
const pluginManager = require('./plugin-manager');

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const BrowserWindow = electron.remote.BrowserWindow;
const ElectronSettings = require('electron-settings');

let instance = null;

class BootStraper{
    constructor(window) {
        this.settings = new ElectronSettings();
        this.pluginMan = new pluginManager();
        this.modelObj = null;
        this.viewModelObj = null;
        this.localwindow = new BrowserWindow({show: false, webPreferences: {nodeIntegration: false}});

        ipcRenderer.on('initialize', () => {
            this.initialize(window);
        });
        ipcRenderer.on('finalize', () => {
            this.finalize();
        });
    }

    initialize(window)
    {
        this.modelObj = new model([], this.settings, window, this.localwindow, this.pluginMan);
        this.viewModelObj = new viewModel(window, this.modelObj);
        this.pluginMan.initialize(this.modelObj).then(() => {
            this.modelObj.initialize();
        });
}

    finalize()
    {
        this.pluginMan.finalize(this.modelObj).then(() => {
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

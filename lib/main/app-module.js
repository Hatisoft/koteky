"use strict";
const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;

const viewModel = require('./app-view-model');
const model = require('./app-model');

module.exports = class AppModule{
    constructor(posts, settings, window, pluginManager){
        this._posts = posts;
        this._settings = settings;
        this.modelObj = new model(this._posts, this._settings, pluginManager, this._whenPluginNoAccess.bind(this));
        this.viewModelObj = new viewModel(window, this.modelObj);
	}

    initialize(){
        this.modelObj.initialize();
	}

	finalize(){
        this.modelObj = null;
        this.viewModelObj = null;
	}

    refresh()
    {
        this.modelObj.reset();
    }

    _whenPluginNoAccess(plugin)
    {
        var localwindow = new BrowserWindow({webPreferences: {nodeIntegration: false}});
        plugin.login(localwindow).then(() => {
            localwindow.close();
            this.modelObj.InitializePluginContent(plugin);
        }).catch((error) => {
            localwindow.close();
        });
    }

    get posts(){
        return this._posts;
    }

    get settings(){
        return this._settings;
    }
};

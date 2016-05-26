"use strict";

const viewModel = require('./app-view-model');
const model = require('./app-model');

module.exports = class AppModule{
    constructor(posts, settings, window, localwindow, pluginManager){
        this._posts = posts;
        this._settings = settings;
        this.otherWindow = localwindow;
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

    _whenPluginNoAccess(plugin)
    {
        this.otherWindow.show();
        plugin.login(this.otherWindow).then(() => {
            this.otherWindow.hide();
            this.modelObj.InitializePluginContent(plugin);
        }).catch((error) => {
            this.otherWindow.hide();
        });
    }

    get posts(){
        return this._posts;
    }

    get settings(){
        return this._settings;
    }
};

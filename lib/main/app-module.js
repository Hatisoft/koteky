"use strict";

const viewModel = require('./app-view-model');
const model = require('./app-model');

module.exports = class AppModule{
    constructor(posts, settings, window, localwindow, pluginManager){
        this._posts = posts;
        this._settings = settings;
        this.modelObj = new model(this._posts, this._settings, window, localwindow, pluginManager);
        this.viewModelObj = new viewModel(window, this.modelObj);
	}

    initialize(){
        this.modelObj.initialize();
	}

	finalize(){
        this.modelObj = null;
        this.viewModelObj = null;
	}

    get posts(){
        return this._posts;
    }

    get settings(){
        return this._settings;
    }
};

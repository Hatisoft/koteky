"use strict";

const pluginsViewModel = require('./plugins-view-model');
const pluginsModel = require('./plugins-model');

module.exports = class PluginsModule{
    constructor(serialization, window){
        this.serialization = serialization;
        this.window = window;
        this._jsonPackage = this.serialization.deserialize();
        this.all = [{ name: "koteky-twitter", version: "^0.4.3" }];
        this.installed = this._jsonPackage.plugins;
        this.pluginsM = new pluginsModel(this.all, this.installed, this.onAddedPlugin);
        this.pluginsVM = new pluginsViewModel(this.window, this.pluginsM);
	}

    onAddedPlugin()
    {
        this._jsonPackage.plugins = this.installed;
        this.serialization.serialize(this._jsonPackage);
    }

};

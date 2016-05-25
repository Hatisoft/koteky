"use strict";

const pluginsViewModel = require('./plugins-view-model');
const pluginsModel = require('./plugins-model');
const search = require('npm-keywordsearch');
const npmPackage = require('npm-package-info')

module.exports = class PluginsModule{
    constructor(serialization, window){
        this.serialization = serialization;
        this.window = window;
        this._jsonPackage = this.serialization.deserialize();
        this.installed = this._jsonPackage.plugins;
        this.all = [];
        search('koteky', (error, packages) => {
            for(let pkg of packages){
                if(pkg.name == "koteky-lib" || pkg.name == "koteky")
                    continue;

                npmPackage(pkg.name, (err, packageInfo) => {
                    this.all.push({name: packageInfo.name, version: packageInfo["dist-tags"].latest});
                });
            }

        });
        this.initialize();
	}

    initialize()
    {
        this.pluginsM = new pluginsModel(this.all, this.installed, this.onAddedPlugin.bind(this));
        this.pluginsVM = new pluginsViewModel(this.window, this.pluginsM);
    }

    onAddedPlugin()
    {
        this._jsonPackage.plugins = this.installed;
        this.serialization.serialize(this._jsonPackage);
    }

};

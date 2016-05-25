"use strict";

const compareVersion = require('compare-version');

module.exports = class PluginsModel{
	constructor(all, installed, updateFile){
        this.all = all;
        this.installed = installed;
        this._updateFile = updateFile;
	}

	isInstalled(plugin)
    {
        if(this.installed[plugin.name])
			return true;
		return false;
    }

	canUpdate(plugin)
    {
		var index = this.all.indexOf(plugin);
        if(this.installed[plugin.name] && compareVersion(this.installed[plugin.name], this.all[index].version) == -1)
			return true;
		return false;
    }

    add(plugin)
    {
        this.installed[plugin.name] = plugin.version;
        this._updateFile();
    }

    remove(plugin)
    {
        delete this.installed[plugin.name];
        this._updateFile();
    }

	update(plugin)
    {
		this.installed[plugin.name] = this.all[this.all.indexOf(plugin)].version;
        this._updateFile();
    }

};

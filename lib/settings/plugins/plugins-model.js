"use strict";

module.exports = class PluginsModel{
	constructor(all, installed, updateFile){
        this.all = all;
        this.installed = installed;
        this._updateFile = updateFile;
	}

	contains(plugin)
    {
        if(this.installed[plugin.name])
			return true;
		return false;
    }

    add(plugin)
    {
        this.installed[plugin.name] = plugin.version;
        this._updateFile(this.installed);
    }

    remove(plugin)
    {
        delete this.installed[plugin.name];
        this._updateFile(this.installed);
    }

};

"use strict";
const plugins = require('electron-plugins');

module.exports = class PluginManager{
    constructor(){
		this.plugins = [];
	}

    initialize(model){
		//TODO: review the context parameters, good idea to pass all this model to allow extending functionality not only adding providers
        return new Promise((resolve,reject) => {
    		plugins.load({}, (err, names, plugins) => {
    			if(err)
    				reject(err);
    			this.plugins = plugins;
    			for (let plugin of this.plugins) {
    				var context = {posts : model.posts, settings : model.settings};
    				plugin.initialize(context);
    			 }
                 resolve();
    		});
        });
	}

	finalize(model){
        return new Promise((resolve,reject) => {
    		for (let plugin of this.plugins) {
    			var context = {posts : model.posts, settings : model.settings};
    			plugin.finalize(context);
    		}
            resolve();
        });
	}
};

"use strict";
const plugins = require('electron-plugins');
const provider = require('koteky-lib').provider;
var check = require('check-types');

module.exports = class AppModel{
	constructor(posts, settings, currentWindow, otherWindow){
		this.posts = posts;
		this.settings = settings;
		this.currentWindow = currentWindow;
		this.otherWindow = otherWindow;
		this.pluginsList = null;
	}

	initialize(){
		//TODO: review the context parameters, good idea to pass all this model to allow extending functionality not only adding providers

		plugins.load({}, (err, names, plugins) => {
			if(err)
				throw err;
			this.pluginsList = plugins;
			//TODO: review the login process
			for (let plugin of plugins) {
				var context = {posts : this.posts, settings : this.settings};
				plugin.initialize(context);
				if(check.like(plugin, provider)){
					/*jshint -W083 */
					plugin.login(this.otherWindow).then(() => {
						this.otherWindow.close();
						plugin.subscribe();
						plugin.retrieve(10);
					}).catch((error) => {
						this.otherWindow.close();
					});
				}
			 }
		});
	}

	finalize(){
		for (let plugin of this.pluginsList) {
			var context = {posts : this.posts, settings : this.settings};
			plugin.finalize(context);
		}
	}

	post(text)
	{
		for (let plugin of this.pluginsList) {
			/*jshint -W083 */
			plugin.post(text).then((result) => {
				console.log(result);
            }).catch((error) => {
                console.log(error);
            });
		 }
	}
};

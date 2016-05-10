"use strict";
var	plugins = require('electron-plugins');

module.exports = class AppModel{
	constructor(posts, settings, currentWindow, otherWindow){
		this.posts = posts;
		this.settings = settings;
		this.currentWindow = currentWindow;
		this.otherWindow = otherWindow;
	}

	initialize(){
		//TODO: review the context parameters, good idea to pass all this model to allow extending functionality not only adding providers
		plugins.load(this.posts, (err, names, plugins) => {
			if(err)
				throw err;
			//TODO: review the login process
			for (let plugin of plugins) {
				 plugin.login(this.otherWindow).then(() => {
					 this.otherWindow.close();
					 plugin.subscribe();
					 plugin.get(10);
				 }).catch((error) => {
					 this.otherWindow.close();
				 });
			 }
		});
		console.log(plugins);
	}
};

"use strict";
var	plugins = require('electron-plugins');
var electron = require('electron');
var BrowserWindow = electron.remote.BrowserWindow;

module.exports = class AppModel{
	constructor(posts, settings){
		this.posts = posts;
		this.settings = settings;
	}

	initialize(){
		//TODO: review the context parameters, good idea to pass all this model to allow extending functionality not only adding providers
		plugins.load(this.posts, function (err, names, plugins) {
			if(err)
				throw err;
			//TODO: review the login process
			var localwindow = new BrowserWindow({show: false, webPreferences: {nodeIntegration: false}});
			for (let plugin of plugins) {
				 plugin.login(localwindow).then(() => {
					 localwindow.close();
					 plugin.subscribe();
					 plugin.get(10);
				 }).catch((error) => {
					 console.log(error);
					 localwindow.close();
				 });
			 }
		});
		console.log(plugins);
	}
};

"use strict";
const provider = require('koteky-lib').provider;
var check = require('check-types');

module.exports = class AppModel{
	constructor(posts, settings, currentWindow, otherWindow, pluginsManager){
		this.posts = posts;
		this.settings = settings;
		this.currentWindow = currentWindow;
		this.otherWindow = otherWindow;
		this.pluginsManager = pluginsManager;
	}

	initialize(){
		//TODO: review where to put the login, probably this should be happening on the settings
		for (let plugin of this.pluginsManager.plugins) {
			if(check.like(plugin, provider) || !plugin.hasAccess()){
				/*jshint -W083 */
				this.otherWindow.show();
				plugin.login(this.otherWindow).then(() => {
					this.otherWindow.hide();
					plugin.subscribe();
					plugin.retrieve(10);
				}).catch((error) => {
					this.otherWindow.hide();
				});
			}
		 }
	}

	post(text)
	{
		for (let plugin of this.pluginsManager.plugins) {
			/*jshint -W083 */
			plugin.post(text).then((result) => {
				console.log(result);
            }).catch((error) => {
                console.log(error);
            });
		 }
	}
};

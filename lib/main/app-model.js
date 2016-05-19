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
		//TODO: review the context parameters, good idea to pass all this model to allow extending functionality not only adding providers
		for (let plugin of this.pluginsManager.plugins) {
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

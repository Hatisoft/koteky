"use strict";
const provider = require('koteky-lib').provider;
var check = require('check-types');

module.exports = class AppModel{
	constructor(posts, settings, pluginsManager, whenPluginNoAccess){
		this.posts = posts;
		this.settings = settings;
		this.pluginsManager = pluginsManager;
		this._whenPluginNoAccess = whenPluginNoAccess;
	}

	initialize(){
		//TODO: review where to put the login, probably this should be happening on the settings
		for (let plugin of this.pluginsManager.plugins) {
			if(check.like(plugin, provider)){
				/*jshint -W083 */
				plugin.hasAccess().then(()=>{
					this.InitializePluginContent(plugin);
				}).catch(()=>{
					this._whenPluginNoAccess(plugin);
				});
			}
		 }
	}

	InitializePluginContent(plugin)
	{
		plugin.subscribe();
		plugin.retrieve(10);
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

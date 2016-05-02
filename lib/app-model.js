"use strict";
var post = require('koteky-lib').post;
var electron = require('electron');
var BrowserWindow = electron.remote.BrowserWindow;
var twitter = require('../../koteky-twitter/lib/provider-twitter');
require('electron-cookies');

module.exports = class AppModel{
	constructor(){
	 this.posts = [];
	 var localwindow = new BrowserWindow({show: false, webPreferences: {nodeIntegration: false}});
	 var tw = new twitter(this.posts);
	 tw.login(localwindow).then(() => {
		 localwindow.close();
		 tw.subscribe();
	 }).catch((error) => {
		 console.log(error);
		 localwindow.close();
	 });

	}


};

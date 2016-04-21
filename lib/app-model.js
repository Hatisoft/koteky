"use strict";
var post = require('koteky-lib').post;
/*var electron = require('electron');
var BrowserWindow = electron.remote.BrowserWindow;
var twitter = require('../../koteky-twitter/lib/provider-twitter');*/

module.exports = class AppModel{
	constructor(){
	 this.posts = [];

	 /*var localwindow = new BrowserWindow({show: false});
	 var tw = new twitter();
	 tw.login(localwindow).then(function(){
		 localwindow.close();
	 }).catch(function (error){
		 console.log("fail:" + error);
		 localwindow.close();
	 });;*/

	 //Test Data
	 var date = new Date(2011, 0, 1, 2, 3, 4, 567);
     var origin = "Twitter";
     var owner = "Jhon";
     var content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere, purus a lobortis rutrum, tellus ex lobortis lectus, et accumsan mauris nunc vel ex. Nam hendrerit enim id odio porttitor, non tristique sem pharetra. Praesent feugiat odio id ex mollis bibendum. Ut lorem nisl, accumsan in metus et, tristique aliquam nulla. Curabitur eu interdum tellus, sit amet rutrum dolor. Ut euismod felis nec elementum sodales. Pellentesque ut nulla blandit, interdum est at, ullamcorper nibh. Ut viverra ante ut sem venenatis, in pharetra quam dignissim. Quisque eget erat sollicitudin, gravida quam quis, efficitur risus. Sed viverra congue mollis.";
	 var localPost = new post(date, origin, owner, content);
	 this.postsFake = [ localPost, localPost, localPost];
	}


};

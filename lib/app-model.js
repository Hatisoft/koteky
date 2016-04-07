"use strict";
var post = require('koteky-lib').post;

module.exports = class AppModel{
	constructor(){
	 this.posts = [];

	 //Test Data
	 var date = new Date(2011, 0, 1, 2, 3, 4, 567);
     var origin = "Twitter";
     var owner = "Jhon";
     var content = "Loren Ipsum Troloro";
	 var localPost = new post(date, origin, owner, content);
	 this.postsFake = [ localPost, localPost, localPost];
	}


};

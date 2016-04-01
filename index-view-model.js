"use strict"
var vue = require('vue');
var updater = require('electron-updater');
var	plugins = require('electron-plugins');
var	util = require('util');
var	ipc = require('ipc');

module.exports = class IndexViewModel{
    constructor (view, model){
        /*view.document.addEventListener('DOMContentLoaded', function () {
        	var context = { document: document, posts : this.posts };
        	plugins.load(context, function (err, loaded) {
        		if(err)
        			return console.log(util.inspect(err));
        		console.log('Plugins loaded successfully.');
        	});
        });

        ipc.on('update-available', function () {
        	console.log('there is an update available for download');
        });*/

        this.vue = new vue({
                el: view,
                data: model
                /*methods:
                    close: () ->
                        @$data.onClose()
                    select: (index) ->
                        @$data.onSelectIndex(index)*/
                    });
    }
};

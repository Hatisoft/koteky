"use strict";
var vue = require('vue');
var updater = require('electron-updater');
var	plugins = require('electron-plugins');
var	util = require('util');
var electron = require('electron');
var ipcRenderer = electron.ipcRenderer;
var BrowserWindow = electron.remote.BrowserWindow;

module.exports = class AppViewModel{
    constructor (view, model){
        view.document.addEventListener('DOMContentLoaded', function () {
        	var context = { "model": model, "posts": model.posts };
        	plugins.load(context, function (err, loaded) {
        		if(err)
        			return console.log(util.inspect(err));
        		console.log('Plugins loaded successfully.');
                var localwindow = new BrowserWindow({show: false, webPreferences: {nodeIntegration: false}});
               	 loaded.login(localwindow).then(() => {
               		 localwindow.close();
               		 loaded.subscribe();
               		 loaded.get(10);
               	 }).catch((error) => {
               		 console.log(error);
               		 localwindow.close();
               	 });
        	});
        });
        ipcRenderer.on('update-available', function () {
            console.log('there is an update available for download');
        });
        new vue({
                el: "#app",
                data: model,
                components: {
                    "post": {
                        props:['data'],
                        template:
                            `<div class="post">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <div class="owner">
                                            {{ data.owner }}
                                        </div>
                                        <div class="origin">
                                            {{ data.origin }}
                                        </div>
                                        <div class="date">
                                            {{ data.date }}
                                        </div>
                                    </div>
                                    <div class="panel-body">
                                        {{ data.content }}
                                    </div>
                                </div>
                            </div>`
                    }
            }
        });
    }
};

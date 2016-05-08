"use strict";
var vue = require('vue');
var	plugins = require('electron-plugins');
var	util = require('util');
var electron = require('electron');
var ipcRenderer = electron.ipcRenderer;
var BrowserWindow = electron.remote.BrowserWindow;

module.exports = class AppViewModel{
    constructor (view, model){
        view.document.addEventListener('DOMContentLoaded', function () {
        	//var context = { "model": model, "posts": model.posts };
        	plugins.load(model.posts, function (err, names, plugins) {
        		if(err)
        			return;

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

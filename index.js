var updater = require('electron-updater');
var	plugins = require('electron-plugins');
var	util = require('util');
var	ipc = require('ipc');

document.addEventListener('DOMContentLoaded', function () {
	var context = { document: document };
	plugins.load(context, function (err, loaded) {
		if(err)
			return console.log(util.inspect(err));
		console.log('Plugins loaded successfully.');
	});
});

ipc.on('update-available', function () {
	console.log('there is an update available for download');
});

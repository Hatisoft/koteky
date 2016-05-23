"use strict";

const ElectronSettings = require('electron-settings');
const path = require('path');

const jsonSerializer = require('../json-serializer');
const pluginsModule = require('./plugins/plugins-module');

module.exports  = class SettingsInitializer{
    constructor(localWindow) {
        this.settings = new ElectronSettings();
        this.serializer = new jsonSerializer(path.join(__dirname, '../../package.json'));
        this.pluginsModule = new pluginsModule(this.serializer, localWindow);
    }
};

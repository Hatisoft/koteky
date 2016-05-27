"use strict";

const ElectronSettings = require('electron-settings');
const path = require('path');

const jsonSerializer = require('../json-serializer');
const pluginsModule = require('./plugins/plugins-module');
const vars = require('../vars');

module.exports  = class SettingsInitializer{
    constructor(localWindow) {
        this.settings = new ElectronSettings({configDirPath: vars.AppPath()});
        this.serializer = new jsonSerializer(path.join(__dirname, '../../package.json'));
        this.pluginsModule = new pluginsModule(this.serializer, localWindow);
    }
};

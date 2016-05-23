"use strict";
const fs = require('fs');

module.exports = class JsonSerializer{
    constructor(path){
        this.path = path;
    }

    deserialize(){
        fs.openSync(this.path, 'r');
        var data=fs.readFileSync(this.path);
        var packageJson = JSON.parse(data);
        return packageJson;
    }

    serialize(content){
        fs.openSync(this.path, 'w');
        fs.writeFileSync(this.path, JSON.stringify(content));
    }
};

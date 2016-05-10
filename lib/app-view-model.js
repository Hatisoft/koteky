"use strict";
var vue = require('vue');

module.exports = class AppViewModel{
    constructor (view, model){
        model.initialize();
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

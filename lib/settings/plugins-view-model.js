"use strict";
var vue = require('vue');

module.exports = class PluginsViewModel{
    constructor (view, model){

        new vue({
                el: "#plugins",
                data: model,
                components: {
                    "plugin": {
                        props:['context'],
                        template:
                            `<div class="plugin">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        {{ context.name }} - {{ context.version }}
                                    </div>
                                </div>
                            </div>`,
                        methods: {
                            add: function(){
                                console.log('adding');
                            },
                            remove: function(){
                                console.log('removing');
                            }
                        }
                    }
            }
        });
    }
};

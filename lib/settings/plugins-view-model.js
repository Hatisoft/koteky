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
                                        <button v-on:click="add">Add</button>
                                        <button v-on:click="remove">Remove</button>
                                    </div>
                                </div>
                            </div>`,
                        methods: {
                            add: function(context){
                                console.log(this.$parent.$options);
                                this.$parent.$options.data().add(this.context);
                            },
                            remove: function(context){
                                this.$parent.$options.data().remove(this.context);
                            }
                        }
                    }
            }
        });
    }
};

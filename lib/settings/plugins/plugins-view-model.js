"use strict";
var vue = require('vue');

module.exports = class PluginsViewModel{
    constructor (view, model){

        new vue({
                el: "#plugins",
                data: model,
                components: {
                    "plugin": {
                        props:['context', '_refreshVisible'],
                        template:
                            `<div class="plugin">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        {{ context.name }} - {{ context.version }}
                                        <div class="setting-buttons">
                                            <button v-on:click="add" v-show.sync="!isInstalled">Add</button>
                                            <button v-on:click="update" v-show.sync="isInstalled && hasUpdate">Update</button>
                                            <button v-on:click="remove" v-show.sync="isInstalled">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`,
                        computed: {
                            isInstalled: function () {
                                /*jshint -W030 */
                                this._refreshVisible;
                                this._refreshVisible = false;
                                return this.$parent.$options.data().isInstalled(this.context);
                            },
                            hasUpdate: function () {
                                /*jshint -W030 */
                                this._refreshVisible;
                                this._refreshVisible = false;
                                return this.$parent.$options.data().canUpdate(this.context);
                            }
                        },
                        methods: {
                            add: function(){
                                this.$parent.$options.data().add(this.context);
                                this._refreshVisible = true;
                            },
                            remove: function(){
                                this.$parent.$options.data().remove(this.context);
                                this._refreshVisible = true;
                            },
                            update: function(){
                                this.$parent.$options.data().update(this.context);
                                this._refreshVisible = true;
                            }
                        }
                    }
            }
        });
    }
};

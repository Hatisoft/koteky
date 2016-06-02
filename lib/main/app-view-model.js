"use strict";
var vue = require('vue');
vue.use(require('vue-moment'));

module.exports = class AppViewModel{
    constructor (view, model){
        new vue({
                el: "#app",
                data: {
                    model: model,
                    comment : ""
                },
                methods: {
                    send: function () {
                        this.model.post(this.comment);
                    }
                },
                components: {
                    "post": {
                        props:['data'],
                        template:
                            `<div class="post">
                                <div class="panel panel-default">
                                    <div class="panel-heading post-heading">
                                        <div class="origin">
                                            {{ data.origin }}
                                        </div>
                                        <div class="owner">
                                            {{ data.owner }}
                                        </div>
                                        <div class="date">
                                            {{ data.date | moment "from" "now" }}
                                        </div>
                                    </div>
                                    <div class="panel-body post-body">
                                        {{{ data.content }}}
                                    </div>
                                </div>
                            </div>`
                    }
            }
        });
    }
};

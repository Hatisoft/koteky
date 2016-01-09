module.exports = function() {
  var use = require('use-plugin')({prefix:'foo',module:module})

  return {
    use: function( plugin_name ) {
      var plugin_description == use(plugin_name)

      // call the init function to init the plugin
      plugin_description.init()
    }
  }
}

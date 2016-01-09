var fm = require('plugin-manager')

// this will try to load:
// 'bar', 'foo-bar', './foo', './foo-bar'
// against the framework module, and then the callingcode module
// nice error messages are thrown if there are problems
fm.use('bar')

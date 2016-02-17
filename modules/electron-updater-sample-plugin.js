function Plugin(context) {
    var d = context.document
    var ul = d.getElementById('plugins')
    var li = d.createElement('li')
    li.innerHTML = 'electron-updater-sample-plugin'
    ul.appendChild(li)
}

module.exports = Plugin

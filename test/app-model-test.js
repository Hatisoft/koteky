var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var provider = require('koteky-lib').provider;
var appModel = require('../lib/main/app-model');
var pluginManager = require('../lib/plugin-manager');

var before = function(){
    posts = [];
    settings = sinon.stub();
    pluginsManager = sinon.createStubInstance(pluginManager);
    whenPluginNoAccess = sinon.stub();
};

var testPostInit = function(){
    var model = new appModel(posts, settings, pluginsManager, whenPluginNoAccess);
    expect(model.posts).to.equal(posts);
};

var testSettingsInit = function(){
    var model = new appModel(posts, settings, pluginsManager, whenPluginNoAccess);
    expect(model.settings).to.equal(settings);
};

var testPluginsManagerInit = function(){
    var model = new appModel(posts, settings, pluginsManager, whenPluginNoAccess);
    expect(model.pluginsManager).to.equal(pluginsManager);
};

var testWhenPluginNoAccessManagerInit = function(){
    var model = new appModel(posts, settings, pluginsManager, whenPluginNoAccess);
    expect(model._whenPluginNoAccess).to.equal(whenPluginNoAccess);
};

var hasAccessCalled = function(){
    var model = new appModel(posts, settings, pluginsManager, whenPluginNoAccess);
    var PLuginSpy = sinon.spy(function() { return sinon.createStubInstance(provider); });
    var plugin = new PLuginSpy();
    plugin.hasAccess.returns(new Promise(()=>{},()=>{}));
    pluginsManager.plugins = [plugin];
    model.initialize();
    expect(plugin.hasAccess).to.have.been.calledOnce;
};

var postCalled = function(){
    var model = new appModel(posts, settings, pluginsManager, whenPluginNoAccess);
    var plugin = new provider();
    plugin.post = sinon.spy(plugin, "post");
    plugin.post_enalble = true;
    pluginsManager.plugins = [plugin];
    model.post('text');
    expect(plugin.post).to.have.been.calledOnce;
};

var postNotCalled = function(){
    var model = new appModel(posts, settings, pluginsManager, whenPluginNoAccess);
    var plugin = new provider();
    plugin.post = sinon.spy(plugin, "post");
    plugin.post_enalble = false;
    pluginsManager.plugins = [plugin];
    model.post('text');
    expect(plugin.post).to.have.been.callCount(0);
};

var resetCalled = function(){
    var localpost = ['','',''];
    var model = new appModel(localpost, settings, pluginsManager, whenPluginNoAccess);
    var PLuginSpy = sinon.spy(function() { return sinon.createStubInstance(provider); });
    var plugin = new PLuginSpy();
    plugin.hasAccess.returns(new Promise(()=>{},()=>{}));
    pluginsManager.plugins = [plugin];
    model.reset();
    expect(model.posts).to.be.empty;
};

var initializePluginContentCalled = function(){
    var model = new appModel(posts, settings, pluginsManager, whenPluginNoAccess);
    var PLuginSpy = sinon.spy(function() { return sinon.createStubInstance(provider); });
    var plugin = new PLuginSpy();
    model.InitializePluginContent(plugin);
    expect(plugin.subscribe).to.have.been.calledOnce;
    expect(plugin.retrieve).to.have.been.calledOnce;
};

/*var hasAccessNotCalled = function(){
    var model = new appModel(posts, settings, pluginsManager, whenPluginNoAccess);
    var PLuginSpy = sinon.spy(function() { return sinon.stub(); });
    var plugin = new PLuginSpy();
    plugin.hasAccess = sinon.spy(() => {return new Promise(()=>{},()=>{}); });
    pluginsManager.plugins = [plugin];
    model.initialize();
    expect(plugin.hasAccess).to.have.callCount(0);
};*/

describe('App Model Initialization', function(){
    before(before);
    it ('has posts initialize', testPostInit);
    it ('has settings initialize', settings);
    it ('has pluginsManager initialize', testPluginsManagerInit);
    it ('has _whenPluginNoAccess initialize', testWhenPluginNoAccessManagerInit);
    it ('hasAccess called if provider', hasAccessCalled);
    it ('post to plugins enabled', postCalled);
    it ('post to plugins disabled', postNotCalled);
    it ('model reset', resetCalled);
    it ('initialize a plugins', initializePluginContentCalled);
    //it ('hasAccess not called if not provider', hasAccessNotCalled);
});

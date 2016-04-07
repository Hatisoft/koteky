/*jshint -W030 */
var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var appModel = require('../lib/app-model');

/*var before = function(){
    date = new Date(2011, 0, 1, 2, 3, 4, 567);
    origin = "Twitter";
    owner = "Jhon";
    content = "Loren Ipsum Troloro";
};*/

var testEmptyPosts = function(){
    var model = new appModel();
    expect(model.posts).to.be.empty;
};

describe('Post Initialization', function(){
    //before(before);
    it ('has empty posts', testEmptyPosts);
});

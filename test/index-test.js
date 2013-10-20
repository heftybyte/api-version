var buster = require('buster');
var assert = buster.referee.assert;
var refute = buster.referee.refute;
var express = require('express');
var request = require('supertest');
var apim = require('../index');

buster.testCase('api', {
    setUp: function() {
        this.app = express();
    },

    'should modify route for route base': function(done) {
        var api = apim.version(this.app, '/api');

        api.post('/user', function(req, res){
            res.send(200);
        }, function(){});


        request(this.app)
            .post('/api/user')
            .expect(200)
            .end(function(err, res){
                refute(err);
                done();
            });
    },

    'should modify route for api version': function(done) {
        var api = apim.version(this.app, '/api', 'v2');

        api.post('/user', function(req, res){
            res.send(200);
        });

        request(this.app)
            .post('/api/v2/user')
            .expect(200)
            .end(function(err, res){
                refute(err);
                done();
            });
    },

    'should cache api object': function() {
        var api = apim.version(this.app, '/api', 'v1');
        var api2 = apim.version(this.app, '/api', 'v2');
        var test = apim.version(this.app, '/api', 'v2');

        refute.equals(api, api2);
        assert.equals(api2, test);
    }
})
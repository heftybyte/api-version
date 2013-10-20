var buster = require('buster');
var refute = buster.referee.refute;
var express = require('express');
var request = require('supertest');
var apim = require('../index');

buster.testCase('api', {
    setUp: function() {
        this.app = express();
    },

    'should modify route for route base': function(done) {
        var api = apim(this.app, '/api');

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
        var api = apim(this.app, '/api', 'v1');

        api.post('/user', function(req, res){
            res.send(200);
        });

        request(this.app)
            .post('/api/v1/user')
            .expect(200)
            .end(function(err, res){
                refute(err);
                done();
            });
    }
})
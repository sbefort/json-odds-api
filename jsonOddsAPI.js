'use strict';

var _ = require('lodash');
var request = require('request');
var qs = require('qs');
var operations = require('./jsonOperations');

var JsonOddsAPI = function(token) {
	if(!token){
		throw new Error('No token provided! Request a token from jsonodds.com.');
	}

	var setOperation = (function(operation){
		this.operation = operation;
	}).bind(this);

	var buildUrl = (function(options) {
		this.url = 'https://jsonodds.com/api/' + operations[this.operation].endpoint(options);
	}).bind(this);

	var makeRequest = (function(options, cb) {
		if (operations[this.operation].type(options) === 'post') {
			post(options, cb);
		}
		else {
			get(options, cb);
		}
	}).bind(this);

	var get = (function(options, cb) {
		var requestOptions = {
			url: this.url + '?' + qs.stringify(options),
			headers: {
				'JsonOdds-API-Key': token
			}
		};
		request.get(requestOptions, function (err, response, body) {
			if (err) return cb(err);
			if (response.statusCode !== 200) return cb(new Error('Invalid response code. The response returned from the server was ' + response.statusCode));
			if (!body) return cb(new Error('JSON Odds API return an invalid body.'));
			parse(body, function(err, parsed) {
				if (err) return cb(err);
				cb(null, response, parsed);
			});
		});
	}).bind(this);

	var post = (function(options, cb) {
		var requestOptions = {
			url: this.url,
			headers: {
				'JsonOdds-API-Key': token
			}
		};
		requestOptions.json = options;
		request.post(requestOptions, function (err, response, body) {
			if (err) return cb(err);
			cb(null, response, body);
		});
	}).bind(this);

	var parse = function(body, cb) {
		try {
			var result = JSON.parse(body);
			if (_.isEmpty(result)) return cb(new Error('There was a problem parsing an empty result.'));
			return cb(null, result);
		}
		catch(e){
			return cb(e + ', Data: ' + body);
		}
	}

	this.getSources = function(cb) {
		var options = {};
		setOperation('getSources');
		buildUrl();
		makeRequest(options, cb);
	}

	this.getOddType = function(cb) {
		var options = {};
		setOperation('getOddType');
		buildUrl();
		makeRequest(options, cb);
	}

	this.getRegions = function(cb) {
		var options = {};
		setOperation('getRegions');
		buildUrl();
		makeRequest(options, cb);
	}

	this.getSports = function(cb) {
		var options = {};
		setOperation('getSports');
		buildUrl();
		makeRequest(options, cb);
	}

	this.getLeagues = function(options, cb) {
		if (_.isFunction(options)) {
			var cb = options;
			var options = {};
		}
		setOperation('getLeagues');
		buildUrl(options);
		makeRequest(options, cb);
	}

	this.getOdds = function(options, cb) {
		if (_.isFunction(options)) {
			var cb = options;
			var options = {};
		}
		setOperation('getOdds');
		buildUrl(options);
		makeRequest(options, cb);
	}

	this.getResults = function(options, cb) {
		if (_.isFunction(options)) {
			var cb = options;
			var options = {};
		}
		setOperation('getResults');
		buildUrl(options);
		makeRequest(options, cb);
	}
}

module.exports = JsonOddsAPI;

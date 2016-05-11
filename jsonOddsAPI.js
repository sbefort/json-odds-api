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
			cb(null, response, body);
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
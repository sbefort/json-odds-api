'use strict';

var operations = {
	getSources: {
		type: function() {
			return 'get';
		},
		endpoint: function() {
			return 'sources';
		}
	},
	getOddType: {
		type: function() {
			return 'get';
		},
		endpoint: function() {
			return 'oddtype';
		}
	},
	getRegions: {
		type: function() {
			return 'get';
		},
		endpoint: function() {
			return 'regions';
		}
	},
	getSports: {
		type: function() {
			return 'get';
		},
		endpoint: function() {
			return 'sports';
		}
	},
	getLeagues: {
		type: function(options) {
			if (options && options.hasOwnProperty('regionName')) {
				return 'post';
			}
			return 'get';
		},
		endpoint: function(options) {
			if (options && options.hasOwnProperty('regionName')) {
				return 'leagues/byregion';
			}
			return 'leagues';
		}
	},
	getOdds: {
		type: function(options) {
			if (options && (options.hasOwnProperty('leagueName') || options.hasOwnProperty('regionName'))) {
				return 'post';
			}
			return 'get';
		},
		endpoint: function(options) {
			var endpoint = 'odds';
			if (options && options.hasOwnProperty('leagueName')) {
				endpoint = endpoint + '/byleague';
			}
			else if (options && options.hasOwnProperty('regionName')) {
				endpoint = endpoint + '/byregion';
			}
			else if (options && options.hasOwnProperty('sport')) {
				endpoint = endpoint + '/' + options.sport;
				delete options.sport;
			}
			return endpoint;
		}
	},
	getResults: {
		type: function() {
			return 'get';
		},
		endpoint: function(options) {
			var endpoint = 'results';
			if (options && options.hasOwnProperty('eventId')) {
				endpoint = endpoint + '/getbyeventid/' + options.eventId;
				delete options.eventId;
			}
			else if (options && options.hasOwnProperty('sport')) {
				endpoint = endpoint + '/' + options.sport;
				delete options.sport;
			}
			return endpoint;
		}
	},
};

module.exports = operations;
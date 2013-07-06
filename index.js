var es = require('event-stream');
var clone = require('clone');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var jst = fs.readFileSync(path.join(__dirname, './templates/amd.jst'), 'utf-8');
var tmpl = _.template(jst);

module.exports = function(options) {
	'use strict';

	var opts = options ? clone(options) : {};

	function wrap(file, callback) {
		var newFile = clone(file);

		var result = tmpl(_.defaults(opts, {
			deps: null,
			params: null,
			exports: null,
			contents: String(newFile.contents)
		}));
		newFile.contents = new Buffer(result);

		callback(null, newFile);
	}

	return es.map(wrap);
};

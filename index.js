var es = require('event-stream');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var jst = fs.readFileSync(path.join(__dirname, './templates/amd.jst'), 'utf-8');
var tmpl = _.template(jst);

module.exports = function(options) {
  'use strict';

  function wrap(file, callback) {
    var opts = options ? _.cloneDeep(options) : {};

    var result = tmpl(_.defaults(opts, {
      deps: null,
      params: null,
      exports: null,
      contents: String(file.contents)
    }));
    file.contents = new Buffer(result);

    callback(null, file);
  }

  return es.map(wrap);
};

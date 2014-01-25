'use strict';

var through = require('through2');
var clone = require('lodash').clone;
var defaults = require('lodash').defaults;
var path = require('path');
var PluginError = require('gulp-util').PluginError;

var tmpl = require('./template').amd;

function compile(contents, opts){
  opts.name = null;
  if(typeof opts.moduleRoot === 'string'){
    opts.name = path.relative(opts.moduleRoot, opts.file.path).slice(0, -path.extname(opts.file.path).length);
  }

  opts.contents = contents;
  return tmpl(opts);
}

function getOptions(file, opts){
  return defaults(clone(opts) || {}, {
    deps: null,
    params: null,
    exports: null,
    file: file,
    moduleRoot: null
  });
}

module.exports = function(options){

  function WrapAMD(file, enc, cb){
    var opts = getOptions(file, options);

    if(file.isStream()){
      this.emit('error', new PluginError('gulp-wrap-amd', 'Streaming not supported'));
      return cb();
    }

    if(file.isBuffer()){
      file.contents = new Buffer(compile(String(file.contents), opts));
    }

    this.push(file);
    cb();
  }

  return through.obj(WrapAMD);
};

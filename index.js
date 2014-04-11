'use strict';

var through = require('through2');
var clone = require('lodash').clone;
var defaults = require('lodash').defaults;
var path = require('path');
var PluginError = require('gulp-util').PluginError;

var tmpl = require('./template').amd;

function compile(file, opts){
  // Based on the approach taken by gulp-es6-module-transpiler.
  var name,
    ext = path.extname(opts.file.path),
    method,
    contents,
    compiler;

  if (opts.anonymous) {
    name = '';
  } else if (typeof opts.name === 'string') {
    name = opts.moduleName;
  } else {
    name = path.relative(opts.moduleRoot || '', opts.file.path).slice(0, -path.extname(opts.file.path).length);

    if (opts.name) {
      name = opts.name(name, file);
    }
  }
  opts.name = name;

  opts.contents = file;
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

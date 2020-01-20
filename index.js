'use strict';

var through = require('through2');
var clone = require('lodash').clone;
var defaults = require('lodash').defaults;
var path = require('path');
var PluginError = require('plugin-error');

var tmpl = require('./template').amd;

function compile(contents, opts){
  opts.name = null;
  if(typeof opts.moduleRoot === 'string'){
    opts.name = path.relative(opts.moduleRoot, opts.file.path).slice(0, -path.extname(opts.file.path).length);
    // platform agnostic for file path definition
    opts.name = opts.name.split(path.sep).join('/');

    if(opts.modulePrefix) {
      var prefix = opts.modulePrefix.indexOf('/') > -1 ? opts.modulePrefix : opts.modulePrefix + '/';
      opts.name = prefix + opts.name;
    }
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

  function WrapAMD(chunk, enc, cb){
    var opts = getOptions(chunk, options);

    if(chunk.isStream()){
      this.emit('error', new PluginError('gulp-wrap-amd', 'Streaming not supported'));
      return cb();
    }

    if(chunk.isBuffer()){
      chunk.contents = Buffer.from(compile(String(chunk.contents), opts));
    }

    this.push(chunk);
    cb();
  }

  return through.obj(WrapAMD);
};

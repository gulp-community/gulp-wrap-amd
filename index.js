'use strict';

const through = require('through2');
const clone = require('lodash').clone;
const defaults = require('lodash').defaults;
const path = require('path');
const PluginError = require('plugin-error');

const tmpl = require('./template').amd;

function compile(contents, opts) {
  opts.name = null;
  if (typeof opts.moduleRoot === 'string') {
    if (opts.moduleRoot === './') {
      opts.moduleRoot = process.cwd();
    }

    opts.name = path.relative(opts.moduleRoot, opts.file.path).slice(0, -path.extname(opts.file.path).length);
    // platform agnostic for file path definition

    if (opts.name.indexOf(opts.moduleRoot) > -1) {
      opts.name = opts.name.slice(opts.name.indexOf(opts.moduleRoot) + opts.moduleRoot.length);
    }

    opts.name = opts.name.split(path.sep).join('/');

    if (opts.modulePrefix) {
      const prefix = opts.modulePrefix.indexOf('/') > -1 ? opts.modulePrefix : opts.modulePrefix + '/';
      opts.name = prefix + opts.name;
    }
  }

  opts.contents = contents;
  return tmpl(opts);
}

function getOptions(file, opts) {
  return defaults(clone(opts) || {}, {
    deps: null,
    params: null,
    exports: null,
    file: file,
    moduleRoot: null
  });
}

module.exports = function (options) {
  function WrapAMD(chunk, enc, cb) {
    const opts = getOptions(chunk, options);

    if (chunk.isStream()) {
      this.emit('error', new PluginError('gulp-wrap-amd', 'Streaming not supported'));
      return cb();
    }

    if (chunk.isBuffer()) {
      chunk.contents = Buffer.from(compile(String(chunk.contents), opts));
    }

    this.push(chunk);
    cb();
  }

  return through.obj(WrapAMD);
};

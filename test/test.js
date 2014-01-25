'use strict';

var test = require('tap').test;

var gulp = require('gulp');
var task = require('../');
var through = require('through2');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

var filename = path.join(__dirname, './fixtures/helloworld.js');
var exportFilename = path.join(__dirname, './fixtures/exports.js');
var jst = fs.readFileSync(path.join(__dirname, '../templates/amd.jst'), 'utf-8');

function expectStream(t, options){
  options = _.defaults(options || {}, {
    deps: null,
    params: null,
    exports: null,
    contents: null,
    name: null
  });
  return through.obj(function(file, enc, cb){
    options.contents = fs.readFileSync(file.path, 'utf-8');
    var expected = _.template(jst, options);
    t.equals(expected, String(file.contents));
    cb();
  });
}

test('should wrap a function in simple AMD wrapper', function(t){
  t.plan(1);

  gulp.src(filename)
    .pipe(task())
    .pipe(expectStream(t));
});

test('should wrap a function in simple AMD wrapper if missing deps but has params', function(t){
  t.plan(1);

  gulp.src(filename)
    .pipe(task({
      params: ['jade']
    }))
    .pipe(expectStream(t));
});

test('should wrap a function in AMD wrapper with custom deps and params', function(t){
  t.plan(1);

  gulp.src(filename)
    .pipe(task({
      deps: ['jade'],
      params: ['jade']
    }))
    .pipe(expectStream(t, {
      deps: ['jade'],
      params: ['jade']
    }));
});

test('should wrap a function in AMD wrapper with custom deps', function(t){
  t.plan(1);

  gulp.src(filename)
    .pipe(task({
      deps: ['domReady!']
    }))
    .pipe(expectStream(t, {
      deps: ['domReady!']
    }));
});

test('should wrap a function in AMD wrapper with custom return variable', function(t){
  t.plan(1);

  gulp.src(exportFilename)
    .pipe(task({
      exports: 'helloWorld'
    }))
    .pipe(expectStream(t, {
      exports: 'helloWorld'
    }));
});

test('should isolate the contents of the individual files', function(t){
  t.plan(2);

  gulp.src(path.join(__dirname, './fixtures/test-*.js'))
    .pipe(task({
      deps: ['test']
    }))
    .pipe(expectStream(t, {
      deps: ['test']
    }));
});

test('should include module name if moduleRoot option is given', function(t) {
  t.plan(1);

  gulp.src(filename)
    .pipe(task({
      moduleRoot: './',
      deps: ['jade'],
      params: ['jade'],
    }))
    .pipe(expectStream(t, {
      deps: ['jade'],
      params: ['jade'],
      name: 'fixtures/helloworld'
    }));
});

test('module name should be relative to moduleRoot', function(t) {
  t.plan(1);

  gulp.src(filename)
    .pipe(task({
      moduleRoot: 'fixtures/',
      deps: ['jade'],
      params: ['jade'],
    }))
    .pipe(expectStream(t, {
      deps: ['jade'],
      params: ['jade'],
      name: 'helloworld'
    }));
});

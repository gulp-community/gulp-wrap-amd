var gulp = require('gulp');
var expect = require('chai').expect;
var task = require('../');
var es = require('event-stream');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

require('mocha');

describe('gulp-wrap-amd compilation', function(){

  'use strict';

  describe('gulp-wrap-amd', function(){

    var filename = path.join(__dirname, './fixtures/helloworld.js');
    var exportFilename = path.join(__dirname, './fixtures/exports.js');
    var jst = fs.readFileSync(path.join(__dirname, '../templates/amd.jst'), 'utf-8');

    function expectStream(done, options){
      options = _.defaults(options || {}, {
        deps: null,
        params: null,
        exports: null,
        contents: null
      });
      return es.map(function(file){
        options.contents = fs.readFileSync(file.path, 'utf-8');
        var expected = _.template(jst, options);
        expect(expected).to.equal(String(file.contents));
        done();
      });
    }

    it('should wrap a function in simple AMD wrapper', function(done){
      gulp.src(filename)
        .pipe(task())
        .pipe(expectStream(done));
    });

    it('should wrap a function in simple AMD wrapper if missing deps but has params', function(done){
      gulp.src(filename)
        .pipe(task({
          params: ['jade']
        }))
        .pipe(expectStream(done));
    });

    it('should wrap a function in AMD wrapper with custom deps and params', function(done){
      gulp.src(filename)
        .pipe(task({
          deps: ['jade'],
          params: ['jade']
        }))
        .pipe(expectStream(done, {
          deps: ['jade'],
          params: ['jade']
        }));
    });

    it('should wrap a function in AMD wrapper with custom deps', function(done){
      gulp.src(filename)
        .pipe(task({
          deps: ['domReady!']
        }))
        .pipe(expectStream(done, {
          deps: ['domReady!']
        }));
    });

    it('should wrap a function in AMD wrapper with custom return variable', function(done){
      gulp.src(exportFilename)
        .pipe(task({
          exports: 'helloWorld',
          filename: exportFilename
        }))
        .pipe(expectStream(done, {
          exports: 'helloWorld',
          filename: exportFilename
        }));
    });

    it('should isolate the contets of the individual files', function (done) {
      var count = 0;
      var callback = function () {
        if (++count === 2) {
          done();
        }
      };

      gulp.src(path.join(__dirname, './fixtures/test-*.js'))
        .pipe(task({
          deps: ['test']
        }))
        .pipe(expectStream(callback, {
          deps: ['test']
        }));
      
    });

  });

});

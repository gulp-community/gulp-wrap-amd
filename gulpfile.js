'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');

const globs = [
  '**/*.js',
  '!node_modules/**',
  '!test/fixtures/**',
  '!template.js'
];

gulp.task('jshint', function(){
  return gulp.src(globs)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter());
});

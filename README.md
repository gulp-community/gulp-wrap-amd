[![Travis Build Status](https://img.shields.io/travis/phated/gulp-wrap-amd.svg?branch=master&style=flat-square&label=travis)](https://travis-ci.org/phated/gulp-wrap-amd)
[![Appveyor Build status](http://img.shields.io/appveyor/ci/phated/gulp-wrap-amd.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/phated/gulp-wrap-amd/branch/master)

## Information

<table>
<tr>
<td>Package</td><td>gulp-wrap-amd</td>
</tr>
<tr>
<td>Description</td>
<td>Wrap files with an AMD wrapper</td>
</tr>
<tr>
<td>Node Version</td>
<td>≥ 0.10</td>
</tr>
</table>

## Usage

Wrap the contents of the file, AMD module will return the entire contents

```javascript
var wrap = require('gulp-wrap-amd');

gulp.task('wrap', function() {
  gulp.src('./lib/*.js')
    .pipe(wrap())
    .pipe(gulp.dest('./dist/'))
});
```

Wrap the contents, with custom dependencies, callback params, and variable to return (exports)

```javascript
var wrap = require('gulp-wrap-amd');

gulp.task('wrap', function() {
  gulp.src('./lib/*.js')
    .pipe(wrap({
      deps: ['jade'],          // dependency array
      params: ['jade'],        // params for callback
      exports: 'jade',         // variable to return
      moduleRoot: 'templates/', // include a module name in the define() call, relative to moduleRoot
      modulePrefix: 'rocks/'  // optional, prefix of the module name. It depends on existance of `moduleRoot`
    }))
    .pipe(gulp.dest('./dist/'))
});
```

Custom module name definition with optional prefix value

```javascript
var wrap = require('gulp-wrap-amd');

gulp.task('wrap', function() {
  gulp.src('client/app/templates/app.hbs')
    .pipe(wrap({
      moduleRoot: 'client/app/', // define the root of module path. Required before using `modulePrefix`
      modulePrefix: 'rocks/'  // optional, end '/' is optional. # output: define('rocks/templates/app', ...)
    }))
    .pipe(gulp.dest('./dist/'))
});
```

## LICENSE

(MIT License)

Copyright (c) 2013 Blaine Bublitz

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

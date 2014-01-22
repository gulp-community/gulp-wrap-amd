;(function() {
  var undefined;

  var objectTypes = {
    'function': true,
    'object': true
  };

  var root = (objectTypes[typeof window] && window) || this;

  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module

  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  var _ = root._;

  var templates = {};

  templates['amd'] = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
    function print() { __p += __j.call(arguments, '') }
    with (obj) {
    __p += 'define(' +
    ((__t = ( name ? JSON.stringify(name) + ',' : '' )) == null ? '' : __t) +
    '' +
    ((__t = ( deps ? JSON.stringify(deps) + ',' : '' )) == null ? '' : __t) +
    'function(' +
    ((__t = ( (!deps ? ['require', 'exports', 'module'] : params || '').toString() )) == null ? '' : __t) +
    '){\n';
     if(exports){
    __p += '\n' +
    ((__t = ( contents )) == null ? '' : __t) +
    '\nreturn ' +
    ((__t = ( exports )) == null ? '' : __t) +
    ';\n';
     } else {
    __p += '\nreturn ' +
    ((__t = ( contents )) == null ? '' : __t) +
    ';\n';
     }
    __p += '\n});\n';

    }
    return __p
  };

  if (freeExports && freeModule) {
    _ = require('lodash');
    if (moduleExports) {
      (freeModule.exports = templates).templates = templates;
    }
  }
}.call(this));

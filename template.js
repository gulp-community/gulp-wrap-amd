;(function() {
  var undefined;

  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  var root = freeGlobal || freeSelf || Function('return this')();

  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  var _ = root._ || {};

  /*----------------------------------------------------------------------------*/

  var templates = {
    'amd': {}
  };

  templates['amd'] =   function(obj) {
    obj || (obj = {});
    var __t, __p = '', __j = Array.prototype.join;
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

  /*----------------------------------------------------------------------------*/

  if (freeModule) {
    _ = require('lodash');
    (freeModule.exports = templates).templates = templates;
    freeExports.templates = templates;
  }
}.call(this));

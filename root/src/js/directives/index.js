define([
    'directives/demoDirectives'
  ],
  function () {
    'use strict';
    return {
      items: Array.prototype.slice.call(arguments),
      registerFn: 'directive',
      nameProp: 'dirName'
    };
});
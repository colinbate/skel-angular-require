define([
    'controllers/demoController',
    'controllers/demoControllerRoot'
  ],
  function () {
    'use strict';
    return {
      items: Array.prototype.slice.call(arguments),
      registerFn: 'controller',
      nameProp: 'ctrlName'
    };
});
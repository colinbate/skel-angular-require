define([
    'services/demoService'
  ],
  function () {
    'use strict';
    return {
      items: Array.prototype.slice.call(arguments),
      registerFn: 'service',
      nameProp: 'svcName'
    };
});
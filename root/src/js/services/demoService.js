define([], function () {
  'use strict';
  var demoService = function ($scope) {
    return {
      hello: function () {
        return 'world';
      }
    };
  };
  demoService.svcName = 'DemoService';
  return demoService;
});
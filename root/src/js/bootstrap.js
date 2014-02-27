define(['angular', 'config', 'lib/angular-route'], function (angular, config) {
  'use strict';
  var appName = '{%= sterileName %}',
      log = function () {
        var msg = Array.prototype.join.call(arguments, ' ');
        if (window.console) {
            window.console.log(msg);
        }
      };

  return {
    initialize: function () {
      var app;
      log('Loading app: {%= sterileName %}');
      app = angular.module(appName, ['ngRoute']);
      app.config(config);
      angular.bootstrap(document, [appName]);
    }
  };
});
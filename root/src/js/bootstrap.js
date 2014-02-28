define([
  'angular',
  'config',
  'services/index',
  'controllers/index',
  'directives/index',
  'lib/angular-route'
  ], function (angular, config, services, controllers, directives) {
  'use strict';
  var appName = '{%= sterileName %}',
      log = function () {
        var msg = Array.prototype.join.call(arguments, ' ');
        if (window.console) {
            window.console.log(msg);
        }
      },
      load = function (app, component) {
        var cIndex = 0;
        if (!app[component.registerFn] || typeof app[component.registerFn] !== 'function') {
          throw new Error('app needs to have a function called ' + component.registerFn);
        }
        for (; cIndex < component.items.length; cIndex += 1) {
          if (component.items[cIndex]) {
            app[component.registerFn](component.items[cIndex][component.nameProp], component.items[cIndex]);
          }
        }
      };

  return {
    initialize: function () {
      var app;
      log('Loading app: {%= sterileName %}');
      app = angular.module(appName, ['ngRoute']);
      app.config(config);
      load(app, services);
      load(app, controllers);
      load(app, directives);
      angular.bootstrap(document, [appName]);
    }
  };
});
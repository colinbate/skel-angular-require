define([], function () {
  'use strict';
  return ['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'html/partials/demoPartial.html',
      controller: 'DemoController'
    }).otherwise({
      redirectTo: '/'
    });
  }];
});
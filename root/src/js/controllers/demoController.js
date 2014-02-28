define([], function () {
  'use strict';
  var demoController = function ($scope) {

    $scope.hello = function () {
        return 'world';
    };
  };
  demoController.ctrlName = 'DemoController';
  demoController.$inject = ['$scope'];
  return demoController;
});
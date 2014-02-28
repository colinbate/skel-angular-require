define([], function () {
  'use strict';
  var demoControllerRoot = function ($scope) {
    $scope.rows = 10;
  };

  demoControllerRoot.ctrlName = 'DemoControllerRoot';
  demoControllerRoot.$inject = ['$scope'];
  return demoControllerRoot;
});
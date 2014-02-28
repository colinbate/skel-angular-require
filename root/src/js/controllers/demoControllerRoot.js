define([], function () {
  'use strict';
  var demoControllerRoot = function ($scope) {
    $scope.rows = [0, 1, 2, 3];
  };

  demoControllerRoot.ctrlName = 'DemoControllerRoot';
  demoControllerRoot.$inject = ['$scope'];
  return demoControllerRoot;
});
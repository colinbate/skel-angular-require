define([], function () {
  'use strict';
  var demoDirective = function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'html/directives/demoDirective.html',
      link: function (scope,element,attr) {}
    };
  };
  demoDirective.dirName = 'demoDirective';
  return demoDirective;
});
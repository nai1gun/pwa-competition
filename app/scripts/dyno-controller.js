dynoApp.controller('DynoController', function($scope, DynoService) {
    var dynoCtrl = this;

    dynoCtrl.dyno = {};

    $scope.$watch(function() {
        return DynoService.getDyno()
      }, function(result) {
        console.log('got dyno ' + JSON.stringify(result));
        dynoCtrl.dyno = result;
      });
    
  });
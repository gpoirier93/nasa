app.controller('PotdCtrl', ['$scope', '$log','potdList', function($scope, $log, potdList) {
  $scope.title = 'nasa';
  $log.log(potdList);
  $scope.potdList = potdList;
}]);

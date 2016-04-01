app.controller('HomeCtrl', ['$scope', '$log','potdList', function($scope, $log, potdList) {
  $scope.potdList = potdList;
}]);

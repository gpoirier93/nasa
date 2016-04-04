app.controller('HomeCtrl', ['$scope', '$log','potdList','potdFactory', function($scope, $log, potdList, potdFactory) {
  $scope.potdList = potdList;
  $scope.isLoading = false;

  $scope.getMorePotds = function() {
    $scope.isLoading = true;
    potdFactory.getPotds(function(potds) {
      $scope.potdList = ($scope.potdList.concat(potds));
      $scope.isLoading = false;
    });
  };
}]);

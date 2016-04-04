app.controller('PotdCtrl', ['$scope', '$log','potd','$sce','potdFactory','$location', function($scope, $log, potd, $sce, potdFactory, $location) {
  $scope.potd = potd;

  if (potd.url) {
    $scope.trustedUrl = $sce.trustAsResourceUrl(potd.url);
  }

  $scope.getMorePotds = function() {
    $scope.isLoading = true;
    potdFactory.getPotds(function(potds) {
      $scope.potdList = ($scope.potdList.concat(potds));
      $scope.isLoading = false;
    });
  };
  $scope.nextPotd = function() {
    potdFactory.getNextPotd($scope.potd, function(nextPotd) {
      $location.path('/potd/'+nextPotd.date);
    });
  };
  $scope.previousPotd = function() {
    var nextPotd = potdFactory.getPreviousPotd($scope.potd);
    if (nextPotd) {
      $location.path('/potd/'+nextPotd.date);
    }
  };
}]);

app.controller('PotdCtrl', ['$scope', '$log','potd','$sce', function($scope, $log, potd, $sce) {
  $scope.potd = potd;
  if (potd.url) {
    $scope.trustedUrl = $sce.trustAsResourceUrl(potd.url);
  }
}]);

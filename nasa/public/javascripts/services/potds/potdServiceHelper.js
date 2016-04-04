app.service('potdServiceHelper', ['$log','$http', function($log, $http) {
  this.getPotds = function(offset, callback) {
    $http.get('/api/v1/potd?offset='+offset).then(function(response) {
      if (response.data) {
        callback(response.data);
      }
    });
  }
}]);

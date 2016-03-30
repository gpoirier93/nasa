app.factory('potdFactory',['$http', '$log', function($http, $log) {
  return {
    get : function(id) {
      return $http.get('/api/v1/potd/'+id);
    },
    getAll : function() {
      return $http.get('/api/v1/potd').then(function(response) {
        $log.log(response.data);
        if (response.data) {
          return response.data;
        }
      });
    }
  }
}]);

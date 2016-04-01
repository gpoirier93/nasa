app.factory('potdFactory',['$http', '$log', function($http, $log) {
  var factory = {
    potds:[]
  };
  factory.getPotdByDate = function(date) {
    var potd;
    if (this.potds.length > 0) {
      for(i = 0; i < this.potds.length; i++) {
        var tempDate = this.potds[i].date.toString().substring(0,10);
        $log.log(tempDate);
        if (tempDate == date) {
          potd = this.potds[i];
          break;
        }
      }
      return potd;
    } else {
      return $http.get('/api/v1/potd/'+date).then(function(response) {
        return response.data;
      })
    }
  };
  factory.getAll = function() {
    return $http.get('/api/v1/potd').then(function(response) {
      $log.log(response.data);
      if (response.data) {
        angular.copy(response.data, factory.potds);
        return response.data;
      }
    });
  }

  return factory;
}]);

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
  factory.getPotds = function(callback) {
    // if called with a callback, we want the values to append to existing ones
    if (callback) {
      var offset;
      if (factory.potds.length > 0) {
        offset = factory.potds.length;
      } else {
        offset = 0;
      }

      $http.get('/api/v1/potd?offset='+offset).then(function(response) {
        if (response.data) {
          if (factory.potds.length > 0) {
            factory.potds = factory.potds.concat(response.data);
          } else {
            angular.copy(response.data, factory.potds);
          }
          callback(response.data);
        }
      });
    } else {
      if (factory.potds.length > 0) {
        return factory.potds;
      } else {
        return $http.get('/api/v1/potd?offset=0').then(function(response) {
          if (response.data) {
            if (factory.potds.length > 0) {
              factory.potds = factory.potds.concat(response.data);
            } else {
              angular.copy(response.data, factory.potds);
            }
            return response.data;
          }
        });
      }
    }
  }

  return factory;
}]);

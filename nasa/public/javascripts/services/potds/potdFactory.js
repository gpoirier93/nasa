app.factory('potdFactory',['$http', '$log','potdServiceHelper', function($http, $log, potdServiceHelper) {
  var factory = {
    potds:[]
  };

  factory.getNextPotd = function(potd, callback) {
    var index = factory.potds.findIndex(function(currentPotd) {
      return currentPotd.id == potd.id;
    });
    if (index+1 >= factory.potds.length) {
      factory.getPotds(function(nextPotds) {
        callback(factory.potds[index+1]);
      });
    } else {
      var nextPotd = factory.potds[index+1];
      callback(nextPotd);
    }
  };

  factory.getPreviousPotd = function(potd) {
    var index = factory.potds.findIndex(function(currentPotd) {
      return currentPotd.id == potd.id;
    });
    if (index > 0) {
      var previousPotd = factory.potds[index-1];
      return previousPotd;
    } else {
      return undefined;
    }
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

  factory.getPotds = function(callback, appendBackward) {
    if (appendBackward) {
      // if (factory.potds.length > 0) {
      //   var offset = factory.potds.length;
      //
      // }
    } else {
      if (factory.potds.length > 0) {
        var offset = factory.potds.length;
        potdServiceHelper.getPotds(offset, function (potds) {
          factory.potds = factory.potds.concat(potds);
          callback(potds)
        });
      } else {
        potdServiceHelper.getPotds(0, function (potds) {
          angular.copy(potds, factory.potds);
          callback(potds);
        });
      }
    }
  };

  factory.getInitialPotds = function() {
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

  return factory;
}]);

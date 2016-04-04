var app = angular.module('nasa', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
            templateUrl: '../views/partials/home.html',
            controller: 'HomeCtrl',
            resolve: {
              potdList: function(potdFactory, $log) {
                return potdFactory.getPotds();
              }
            }
        }).when('/potd/:date', {
          templateUrl: '../views/partials/potd.html',
          controller: 'PotdCtrl',
          resolve: {
            potd: function($route, potdFactory, $log) {
              return potdFactory.getPotdByDate($route.current.params.date);
            }
          }
        }).otherwise({
          redirectTo: "/"
        });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);

var app = angular.module('nasa', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
            templateUrl: 'views/partials/home.html',
            controller: 'PotdCtrl',
            resolve: {
              potdList: function(potdFactory) {
                return potdFactory.getAll();
              }
            }
        });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

}]);

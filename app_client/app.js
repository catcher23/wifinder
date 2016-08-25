(function () {
  angular.module('wifinderApp', ['ngRoute']);

  function config ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
  }

  angular
    .module('wifinderApp')
    .config(['$routeProvider', config]);
})();

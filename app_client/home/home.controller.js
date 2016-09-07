(function () {
  angular
    .module('wifinderApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'wifinderData', 'geolocation', 'yelp'];
  function homeCtrl ($scope, wifinderData, geolocation, yelp) {
    var vm = this;
    vm.pageHeader = {
      title: 'wifinder',
      strapline: yelp.getLocations()
    };
    vm.sidebar = {
      content:development.yelp.consumerKey
    };
    vm.message = 'Checking your location';
    vm.getData = function (position) {
      var lat = position.coords.latitude,
        lng = position.coords.longitude;

      vm.message = "Searching for nearby places";

      wifinderData.locationByCoords(lat, lng)
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No locations found nearby";
          vm.data = { locations: data };

        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong";
        });
    };
    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };
    vm.noGeo = function () {
      $scope.$apply(function() {
        vm.message = "Geolocation is not supported by this browser.";
      });
    };
    geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);

  }
})();
(function () {
  angular
    .module('wifinderApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'wifinderData', 'geolocation'];
  function homeCtrl ($scope, wifinderData, geolocation) {
    var vm = this;
    vm.pageHeader = {
      title: 'wifinder',
      strapline: 'Find places to work with wifi near you!'
    };
    vm.sidebar = {
      content: "Looking for wifi and a seat? wiFinder helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let wiFinder help you find the place you're looking for."
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
(function () {
  angular
    .module('wifinderApp')
    .service('wifinderData', wifinderData);

  wifinderData.$inject = ['$http'];
  function wifinderData($http) {
    var locationByCoords = function (lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
    };
    return {
      locationByCoords: locationByCoords
    };
  }
}());
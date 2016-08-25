(function () {
  angular
    .module('wifinderApp')
    .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl () {
    var vm = this;

    vm.pageHeader = {
      title: 'About wiFinder'
    };

    vm.main = {
      content: 'wiFinder was created to help people find places to sit down and get a bit of work done.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
  }

})();
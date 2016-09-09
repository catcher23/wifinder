(function () {

    angular
        .module('wifinderApp')
        .controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$location', 'authentication'];
    function registerCtrl($location, authentication) {
        var vm = this;

        vm.pageHeader = {
            title: 'Create a new wiFinder account'
        };

        vm.credentials = {
            name : "",
            email : "",
            password : ""
        };

        vm.returnPage = $location.search().page || '/';

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.credentials || !vm.credentials.email || !vm.credentials.password) {
                vm.formError = "All fields required, please try agian";
                return false;
            } else {
                vm.doRegister();
            }
        };

        vm.doRegister = function () {
            vm.formError = "";
            authentication
                .register(vm.credentials)
                .error(function(err) {
                    vm.formError = err;
                })
                .then(function() {
                    $location.search('page', null);
                    $location.path();
                });
        }
     }
});
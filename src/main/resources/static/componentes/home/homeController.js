(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = [ '$rootScope' ,'genericoService' ];
    function HomeController( $rootScope , genericoService) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
      

      


    }

})();
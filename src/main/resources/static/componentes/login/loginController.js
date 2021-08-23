(function () {
    'use strict';

    angular
        .module('app')
        .controller('registerController', registerController);

        registerController.$inject = [ '$rootScope','$routeParams','ParametricasService'];
        function registerController( $rootScope, $routeParams , ParametricasService  ) { 
        var vm = this;

        console.log('entro a pedidos controller');

         vm.register= this.login;


         function login(){
            
         }

    
   
      

   

    }

})();
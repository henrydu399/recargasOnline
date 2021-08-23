(function () {
    'use strict';

    angular
        .module('app')
        .controller('recargasController', recargasController);

        recargasController.$inject = [ '$rootScope','$routeParams','genericoService'];
    function recargasController( $rootScope, $routeParams , genericoService  ) { 
        var vm = this;

        console.log('entro a pedidos controller');

      
      

        vm.tabSeleccion ='all'
       

        vm.foo = true;

        vm.user = null;
        vm.allUsers = [];

        vm.listOperador = [];

        vm.listRecargas = [];
        vm.listRecargasSafe = [];
        getRecargas();
        function getRecargas(){
            genericoService.getAll('recargas/all')
                    .then(function (response) {
                        if (response.status == 200) {
                            vm.listRecargas =  response.data;
                            vm.listRecargasSafe =  response.data;
                        } else {   
                            Flash.create('danger', $rootScope.ERROR_GENERARL_SERVIDOR, 5000, {class: 'custom-class', id: 'custom-id'}, true);                                               
                        }
                    });
        }

        vm.listRecargasxOperador = [];
        vm.listRecargasxOperadorSafe = [];
         orderOperador();
        function orderOperador(){
            genericoService.getAll('recargas/operador')
                    .then(function (response) {
                        if (response.status == 200) {
                            vm.listRecargasxOperador =  response.data;
                            vm.listRecargasxOperadorSafe =  response.data;
                        } else {   
                            Flash.create('danger', $rootScope.ERROR_GENERARL_SERVIDOR, 5000, {class: 'custom-class', id: 'custom-id'}, true);                                               
                        }
                    });
        }

      

   

    }

})();
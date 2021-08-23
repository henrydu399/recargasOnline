(function () {
    'use strict';

    angular
        .module('app')
        .controller('pedidosController', pedidosController);

        pedidosController.$inject = [ '$rootScope','$routeParams','ParametricasService'];
    function pedidosController( $rootScope, $routeParams , ParametricasService  ) { 
        var vm = this;

        console.log('entro a pedidos controller');

        vm.accion = $routeParams['accion'];

        if ($routeParams['accion'] == "crear") 
        {

        } else if ($routeParams['accion'] == "ver") {
           
        }

        vm.foo = true;

        vm.user = null;
        vm.allUsers = [];

        getPedidos();


        
        vm.listPedidos = [];
        vm.listPedidosSafe = [];
        function getPedidos(){
            ParametricasService.getAll('pedidos')
                    .then(function (response) {
                        if (response.status == 200) {
                            vm.listPedidos =  response.data;
                            vm.listPedidosSafe =  response.data;
                        } else {   
                            Flash.create('danger', $rootScope.ERROR_GENERARL_SERVIDOR, 5000, {class: 'custom-class', id: 'custom-id'}, true);                                               
                        }
                    });
        }
      

   

    }

})();
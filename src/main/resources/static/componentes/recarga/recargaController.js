(function () {
    'use strict';

    angular
        .module('app')
        .controller('recargaController', recargaController);

        recargaController.$inject = [ '$rootScope','$routeParams','genericoService','AuthenticationService','Flash'];
        function recargaController( $rootScope, $routeParams , genericoService, AuthenticationService , Flash ) { 
        var vm = this;

        console.log('entro a register  controller');

         vm.register= register;
         vm.model = {
            user : 'USER001',
            concepto: 'RECARGA DE MOVIL',
			fecha: new Date()

         };


     

         function register(){
            genericoService.save('recargas/recargar', vm.model)
                    .then(function (response) {
                        if (response.status == 200) {   
                            vm.model = {};            
                            Flash.create('success', 'SE HA RECARGADO SU TELEFONO', 5000, { class: 'custom-class', id: 'custom-id' }, true);
                        }
                    });
         };

    
   
      

   

    }

})();
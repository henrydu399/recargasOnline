(function () {
    'use strict';

    angular
        .module('app')
        .factory('genericoService', genericoService);

    genericoService.$inject = ['$http', '$rootScope', '$timeout', '$q', 'Flash','$location', '$localStorage'];
    function genericoService($http, $rootScope, $timeout, $q, Flash,$location , $localStorage) {
        var service = {};

        service.save = save;
        service.getAll = getAll;
        service.findById = findById;
        service.edit = edit;
        service.find = find;
        service.delet = delet;
        service.getbyfilter = getbyfilter;

        service.saveFile = saveFile;
        service.editFile = editFile;



        return service;

        function getAll(nameParametrica) {
            $rootScope.loading = true;
            var deferred = $q.defer();
            $http({
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Accept': '*/*'
                },
                method: 'GET',
                url: $rootScope.URL + nameParametrica 
                // data:  JSON.stringify(dto) 
            }).then(function successCallback(response) {
                $rootScope.loading = false;
                deferred.resolve(response);
            }, function errorCallback(response) {
                $rootScope.loading = false;
                if( response.status == 403){
                    $rootScope.globalData = {
                        verTopMenu: false,
                        verLeeftMenu: false
                    };
                    $localStorage.globals = null;
                    $location.path('/login');
                }
                mostrarError(response, "Error con el servidor ");
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        function getbyfilter(nameParametrica, filter) {
            $rootScope.loading = true;
            var deferred = $q.defer();
            $http({
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Accept': '*/*'
                },
                method: 'GET',
                url: $rootScope.URL + $rootScope.PARAMETRICAS.get(nameParametrica) + '/' + $rootScope.REST.get('GETALL')+ getFilter(filter)
                // data:  JSON.stringify(dto) 
            }).then(function successCallback(response) {
                $rootScope.loading = false;
                deferred.resolve(response);
            }, function errorCallback(response) {
                $rootScope.loading = false;
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        function getFilter(filters) {
            
            if (filters !== 'undefined' && filters != null) {
                var items = Object.keys(filters);
                var urlComplement = "";
                for (var a = 0; a < items.length; a++) {
                        urlComplement = urlComplement + "/"+ Object.values(filters)[a];
                }
                return urlComplement;
            }else{
                return "";
            }
        }


        function saveFile(nameParametrica, dto) {
            $rootScope.loading = true;
            var deferred = $q.defer();
            $http({
                headers: {
                    'Content-Type': undefined
                },
                method: 'POST',
                data: dto,
                url: $rootScope.URL + $rootScope.PARAMETRICAS.get(nameParametrica) + '/' + $rootScope.REST.get('CREATE')
                // data:  JSON.stringify(dto) 
            }).then(function successCallback(response) {
                $rootScope.loading = false;
                deferred.resolve(response);
            }, function errorCallback(response) {
                $rootScope.loading = false;
                mostrarError(response, "Guardar Archivo ");
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function save(path, dto) {
            $rootScope.loading = true;
            var deferred = $q.defer();
            $http({
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Accept': '*/*'
                },
                method: 'POST',
                data: dto,
                url: $rootScope.URL + path + '/' 
                // data:  JSON.stringify(dto) 
            }).then(function successCallback(response) {
                $rootScope.loading = false;
                deferred.resolve(response);
            }, function errorCallback(response) {
                $rootScope.loading = false;
                mostrarError(response, "Guardar");
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function edit(nameParametrica, dto) {
            $rootScope.loading = true;
            var deferred = $q.defer();
            $http({
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Accept': '*/*'
                },
                method: 'PUT',
                url: $rootScope.URL + $rootScope.PARAMETRICAS.get(nameParametrica) + '/' + $rootScope.REST.get('EDIT'),
                data: dto
            }).then(function successCallback(response) {
                $rootScope.loading = false;
                deferred.resolve(response);
            }, function errorCallback(response) {
                $rootScope.loading = false;
                mostrarError(response, "Editar");
                deferred.resolve(response);
            });
            return deferred.promise;
        }


        function editFile(nameParametrica, dto) {
            $rootScope.loading = true;
            var deferred = $q.defer();
            $http({
                headers: {
                    'Content-Type': undefined
                },
                method: 'POST',
                data: dto,
                url: $rootScope.URL + $rootScope.PARAMETRICAS.get(nameParametrica) + '/' + $rootScope.REST.get('EDIT')
                // data:  JSON.stringify(dto) 
            }).then(function successCallback(response) {
                $rootScope.loading = false;
                deferred.resolve(response);
            }, function errorCallback(response) {
                $rootScope.loading = false;
                mostrarError(response, "Editar Archivo");
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function find(nameParametrica) {
            $rootScope.loading = true;
            var deferred = $q.defer();
            $http({
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Accept': '*/*'
                },
                method: 'GET',
                url: $rootScope.URL + $rootScope.PARAMETRICAS.get(nameParametrica) + '/' + $rootScope.REST.get('GET')
                // data:  JSON.stringify(dto) 
            }).then(function successCallback(response) {
                $rootScope.loading = false;
                deferred.resolve(response);
            }, function errorCallback(response) {
                $rootScope.loading = false;
                mostrarError(response, "Buscar");
                deferred.resolve(response);
            });
            return deferred.promise;
        }


        function findById(nameParametrica, model) {
            $rootScope.loading = true;
            var deferred = $q.defer();
            $http({
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Accept': '*/*'
                },
                method: 'POST',
                data: model,
                url: $rootScope.URL + $rootScope.PARAMETRICAS.get(nameParametrica) + '/' + $rootScope.REST.get('FINDBYID')
                // data:  JSON.stringify(dto) 
            }).then(function successCallback(response) {
                $rootScope.loading = false;
                deferred.resolve(response);
            }, function errorCallback(response) {
                $rootScope.loading = false;
                mostrarError(response, "Buscar");
                deferred.resolve(response);
            });
            return deferred.promise;
        }


        function delet(nameParametrica, dto) {
            $rootScope.loading = true;
            var deferred = $q.defer();
            $http({
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Accept': '*/*'
                },
                method: 'DELETE',
                url: $rootScope.URL + $rootScope.PARAMETRICAS.get(nameParametrica) + '/' + $rootScope.REST.get('DELETE'),
                data: dto
            }).then(function successCallback(response) {
                $rootScope.loading = false;
                deferred.resolve(response);
            }, function errorCallback(response) {
                $rootScope.loading = false;
                mostrarError(response, "Borrar");
                deferred.resolve(response);
            });
            return deferred.promise;
        }




        function mostrarError(response, operacion) {
            if (response !== 'undefined' && response != null) {

                if (response.data !== 'undefined' && response.data != null) {

                    if( response.data.error !== 'undefined'  &&  response.data.error != null &&  response.data.error === 'Internal Server Error' ){
                        Flash.create('danger', 'Error con el Servidor' , 5000, { class: 'custom-class', id: 'custom-id' }, true);
                        $('html, body').animate({ scrollTop: 0 }, 'slow');
                    }else{
                        Flash.create('danger', response.data, 5000, { class: 'custom-class', id: 'custom-id' }, true);
                        $('html, body').animate({ scrollTop: 0 }, 'slow');
                    }

                } else {

                        Flash.create('danger', 'Error general' , 5000, { class: 'custom-class', id: 'custom-id' }, true);
                        $('html, body').animate({ scrollTop: 0 }, 'slow');
                    


                }

            }

        }




    }



})();
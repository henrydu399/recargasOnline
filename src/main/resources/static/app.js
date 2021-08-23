(function () {
    'use strict';
    
    var appGlobal = angular
       // .module('app', ['ngRoute', 'ngMaterial','ngCookies','ngStorage','smart-table','ngFlash','ngFileUpload','ngSanitize'])
        .module('app', ['ngRoute','ngStorage','smart-table','ngFlash','ngFileUpload','ngSanitize'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider','$qProvider'];
    function config($routeProvider, $locationProvider,$qProvider) {
        
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'componentes/home/home.view.html',
                controllerAs: 'vm'
            })
            .when('/recarga', {
              controller: 'recargaController',
              templateUrl: 'componentes/recarga/recarga.view.html',
              controllerAs: 'vm'
            })
            .when('/recargas', {
              controller: 'recargasController',
              templateUrl: 'componentes/recargas/ver.view.html',
              controllerAs: 'vm'
            })


            .otherwise({ redirectTo: '/' });

           $qProvider.errorOnUnhandledRejections(false);

         
         

    }

   

    run.$inject = ['$rootScope', '$location', '$http','$localStorage'];
    function run($rootScope, $location, $http,$localStorage) {

      $rootScope.loading = false;

        ///REST SERVICES
        $rootScope.REST = new Map()
        $rootScope.REST.set('GETALL', 'getAll');
        $rootScope.REST.set('FINDBYID', 'findById');
        $rootScope.REST.set('GET', 'get');
        $rootScope.REST.set('CREATE', 'create');
        $rootScope.REST.set('EDIT', 'edit');
        $rootScope.REST.set('DELETE', 'delete');

       

        //// URL PARAMETRICAS GENERICAS ////
        $rootScope.PARAMETRICAS = new Map()
        $rootScope.PARAMETRICAS.set('PARAMETRICAS', 'Parameters');
        

    
        $rootScope.changeView = function(view) {
            $location.path(view);
        }

        //$rootScope.URL ="http://sysh.ddns.net:8090/";
         $rootScope.URL = "http://localhost:8090/";
        // URL API FILE MANAGER
        //$rootScope.URL_API_FILE = 'http://systemhost.ddns.net:8081/';
        $rootScope.URL_API_FILE = 'http://localhost:8081/';
        // keep user logged in after page refresh
        //$rootScope.globals = $cookieStore.get('globals') || {};
        
       

        if ($localStorage.globals  !== 'undefined'  && $localStorage.globals != null ) {
            $http.defaults.headers.common['Authorization'] =  $localStorage.globals.token; // jshint ignore:line
            // Bnderas mostrar control de menu y usuario 
            $rootScope.globalData = {
                verTopMenu: true,
                verLeeftMenu: true
            };
            $rootScope.globals = $localStorage.globals;
            $rootScope.restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            $rootScope.loggedIn = true;
        }else{
          $http.defaults.headers.common['Authorization'] =  null;
          $rootScope.globalData = {
            verTopMenu: false,
            verLeeftMenu: false
        };
        $rootScope.globals = null;
        $rootScope.restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
        $rootScope.loggedIn = false;
        }

        $rootScope.logout = function() {
            $rootScope.globalData = {
                verTopMenu: true,
                verLeeftMenu: true
            };
            $rootScope.globals = null;
            $localStorage.globals = null;

        };

/*         $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            if ($rootScope.restrictedPage &&  $rootScope.loggedIn == false) {
                $location.path('/');
            }
        }); */

     

    }

    appGlobal.directive('convertToNumber', function() {
        return {
          require: 'ngModel',
          link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(val) {
              return parseInt(val, 10);
            });
            ngModel.$formatters.push(function(val) {
              return '' + val;
            });
          }
        };
      });

      appGlobal.directive('stringToNumber', function() {
        return {
          require: 'ngModel',
          link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
              return '' + value;
            });
            ngModel.$formatters.push(function(value) {
              return parseFloat(value);
            });
          }
        };
      });


    appGlobal.directive('dateField', function($filter) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelController) {
                 ngModelController.$parsers.push(function(data) {
      
                    //View -> Model
                    //var date = Date.parseExact(data,'dd/MM/yyyy');
      
                    // if the date field is not a valid date 
                    // then set a 'date' error flag by calling $setValidity
                    //ngModelController.$setValidity('date', date!=null);
                    //return date == null ? undefined : date;
                    var ano = data.getUTCFullYear();
                    var mes = data.getUTCMonth();
                    var dia = data.getUTCDate();
                    return new Date(ano,mes ,dia);
                    //return data.toDateString();
                   // return data;
                 });
                 ngModelController.$formatters.push(function(data) {
                    //Model -> View
                  //  return $filter('date')(data, "dd/MM/yyyy");
                  // new Date(year, month, day, hours, minutes, seconds, milliseconds)
                  if( data !== 'undefined' && data != null){
                    var date = data.split('-');

                    var ano = parseInt(date[0]);
                    var mes = parseInt(date[1]);
                    var dia = parseInt(date[2]);
                    return new Date(ano,mes-1,dia,0,0,0,0);
                  }else{
                    return null;
                  }
                  
                    
                    //return $filter('date')(data, "yyyy-MM-dd");
                 });    
             }
          }
      });
      

  
})();




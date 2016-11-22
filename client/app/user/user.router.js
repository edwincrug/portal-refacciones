'use strict';

angular.module('refacciones')
  .config(function($stateProvider) {

    
    $stateProvider.state('user', {
      url: '/',

      templateUrl: 'app/user/user.html',
      authenticate: true,
      controller:function($scope,$state,User,Auth){

        closeNav();


        User.get(function(data){         

          $scope.user = data;
          $scope.classMenu = "mainnav-sm"
          $scope.toggeMenu = function(){
              if($scope.classMenu == "mainnav-sm"){
                $scope.classMenu = "mainnav-in";
              }else {
                $scope.classMenu = "mainnav-sm";
              }
          }

        })

       $scope.cerrarSession = function()
       {
          /*remueve las opciones de historico*/
          localStorage.removeItem('histEmpresa')
          localStorage.removeItem('histSucursal')

          /*remueve las opciones de pedidos*/
          localStorage.removeItem('pedEmpresa')
          localStorage.removeItem('pedSucursal')
          /*remueve las opciones de cotizaciones*/
          localStorage.removeItem('cotEmpresa')
          localStorage.removeItem('cotSucursal')

          Auth.logout();
          $state.go('login');
          
       } 


      }
    });
  });

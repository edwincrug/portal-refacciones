'use strict';

(function() {

  class CotizacionComponent {
    constructor($scope, Empresa,Sucursal) {
      $scope.sucursalActual = $scope.empresaActual  = null;
      Empresa.query({user: 3}, function(data) {
        $scope.empresas = data;
        $scope.empresaActual = $scope.empresas[0];
      })

      $scope.cambioEmpresa = function(){
        console.log($scope.empresaActual);
        if($scope.empresaActual.id != 0 ){
          Sucursal.query({user: 3,empresa:$scope.empresaActual.emp_idempresa}, function(data) {
            console.log(data)
            $scope.sucursales = data;
            $scope.sucursalActual = $scope.sucursales[0];
          })
        }else{
          $scope.sucursales = $scope.sucursalActual =  null;
        }

      }


    }
  }

  angular.module('refacciones')
    .component('cotizacion', {
      templateUrl: 'app/user/cotizacion/cotizacion.html',
      controller: CotizacionComponent
    });

})();

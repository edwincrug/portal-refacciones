'use strict';

(function() {

  class CotizacionComponent {
    constructor($scope, Empresa,Sucursal) {
      $scope.sucursalActual = $scope.empresaActual  = null;
      Empresa.query({user: 11}, function(data) {
        data.unshift({emp_idempresa: 0, emp_nombre: "Selecciona ...", emp_nombrecto: ""})
        $scope.empresas = data;
        $scope.empresaActual = $scope.empresas[0];
      })

      $scope.cambioEmpresa = function(){
        console.log($scope.empresaActual);
        if($scope.empresaActual.emp_idempresa != 0 ){
          Sucursal.query({user:11,empresa:$scope.empresaActual.emp_idempresa}, function(data) {
            data.unshift({AGENCIA:"0",NOMBRE_AGENCIA:"Selecciona ..."});
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

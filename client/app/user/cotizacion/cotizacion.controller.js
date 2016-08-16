'use strict';

(function() {

  class CotizacionComponent {
    constructor($scope, Empresa, Sucursal, Cotizacion) {

      $scope.sucursalActual = $scope.empresaActual = null;
      $scope.user = 11;
      $scope.listaCotizaciones = [];
      Empresa.query({
        user: $scope.user
      }, function(data) {
        data.unshift({
          emp_idempresa: 0,
          emp_nombre: "Selecciona ...",
          emp_nombrecto: ""
        })
        $scope.empresas = data;
        $scope.empresaActual = $scope.empresas[0];
      })

      $scope.cambioEmpresa = function() {
        if ($scope.empresaActual.emp_idempresa != 0) {
          Sucursal.query({
            user: $scope.user,
            empresa: $scope.empresaActual.emp_idempresa
          }, function(data) {
            data.unshift({
              AGENCIA: "0",
              NOMBRE_AGENCIA: "Selecciona ..."
            });
            $scope.sucursales = data;
            $scope.sucursalActual = $scope.sucursales[0];
            $scope.cambioSucursal();
          })
        } else {
          $scope.sucursales = $scope.sucursalActual = null;
        }
      }

      $scope.borrarCotizacion = function(c) {
        bootbox.confirm("<h4>Deseas borrar permanentemente la cotizacion " + c.folio + "?</h4>", function(result) {
          if (result) {
            c.$delete({id:c.idCotizacion},function(data) {
              console.log(data)
              if(data.estatus=="ok"){
                $scope.listaCotizaciones.forEach(function(d, n) {
                  if (d.idCotizacion == c.idCotizacion) {
                    $scope.listaCotizaciones.splice(n, 1);
                  }
                })
                toastr.info(data.mensaje)
              }
            })
          }
        });
      }

      $scope.cambioSucursal = function() {
        Cotizacion.query({
            user: $scope.user,
            empresa: $scope.empresaActual.emp_nombrecto,
            sucursal: $scope.sucursalActual.suc_nombrecto
          },
          function(data) {
            $scope.listaCotizaciones = data;
          })
      }
    }
  }

  angular.module('refacciones')
    .component('cotizacion', {
      templateUrl: 'app/user/cotizacion/cotizacion.html',
      controller: CotizacionComponent
    });

})();

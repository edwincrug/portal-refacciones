'use strict';

(function() {

  class PedidoComponent {
    constructor($scope, Empresa, Sucursal, Cotizacion) {
      $('.chart').easyPieChart({
        barColor: "#8bc34a",
        "lineWidth": 8,
        "size": 115
      });
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
            c.$delete({
              id: c.idCotizacion
            }, function(data) {
              console.log(data)
              if (data.estatus == "ok") {
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
            $scope.listaCotizaciones = data
            if ($scope.sucursalActual.Con_LimCredito) {
              $('.chart').data('easyPieChart').update((($scope.sucursalActual.Con_LimCredito) / $scope.sucursalActual.Con_LimCredito) * 100);
            }
          })
      }
    }
  }

  angular.module('refacciones')
    .component('pedido', {
      templateUrl: 'app/user/pedido/pedido.html',
      controller: PedidoComponent
    });

})();

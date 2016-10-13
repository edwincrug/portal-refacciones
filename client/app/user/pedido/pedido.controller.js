'use strict';

(function() {

  class PedidoComponent {
    constructor($scope, User, Empresa, Sucursal, Pedido) {

      $scope.sucursalActual = $scope.empresaActual = null;
      $scope.listaPedidos = [];
      User.get(function(data) {
        $scope.user = data;

        // Pedido.query({
        //     user: $scope.user.per_idpersona,
        //     estatus: 1,
        //   },
        //   function(data) {
        //     $scope.listaPedidos = data
        //     console.log(data)            
        //   })

        Empresa.query({
          user: $scope.user.per_idpersona
        }, function(data) {
          data.unshift({
            emp_idempresa: 0,
            emp_nombre: "Seleccioné ...",
            emp_nombrecto: ""
          })
          $scope.empresas = data;
          $scope.empresaActual = $scope.empresas[0];
        })
      });

      //LQMA ADD 05102016 obtiene detalle pedido
      $scope.muestraDetallePedido = function(idPedido)
      {


      }

      $scope.cambioEmpresa = function() {
        if ($scope.empresaActual.emp_idempresa != 0) {
          Sucursal.query({
            user: $scope.user.per_idpersona,
            empresa: $scope.empresaActual.emp_idempresa
          }, function(data) {
            data.unshift({
              AGENCIA: "0",
              NOMBRE_AGENCIA: "Seleccioné ...",
              suc_nombrecto: ""
            });
            $scope.sucursales = data;
            $scope.sucursalActual = $scope.sucursales[0];
          })
        } else {
          $scope.sucursales = $scope.sucursalActual = null;
        }
      }

      $scope.cambioSucursal = function(empresa,sucursal) {
        Pedido.query({
            user: $scope.user.per_idpersona,
            estatus: 1,
            empresa: empresa.emp_idempresa,
            sucursal: sucursal.AGENCIA
          },
          function(data) {
            $scope.listaPedidos = data
            //console.log(data)            
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

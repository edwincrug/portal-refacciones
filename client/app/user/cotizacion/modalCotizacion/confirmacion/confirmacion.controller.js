
'use strict';

(function() {

  class ConfirmacionComponent {

    constructor($scope, $location, $state, User, Refaccion, Cotizacion, Pedido) {
      //Variables iniciales
      var self = this;
      $scope.empresaActual = $scope.$parent.$parent.$parent.empresaActual;
      $scope.sucursalActual = $scope.$parent.$parent.$parent.sucursalActual;
      $scope.folioActual = $scope.$parent.$parent.folioActual;
      $scope.direccionActual = $scope.$parent.$parent.direccionActual;
      $scope.total = $scope.$parent.$parent.total;
      $scope.backorder = $scope.$parent.$parent.backorder = false;;
      $scope.spinner = true;

      User.get(function(data) {
        $scope.user = data;
        //Carga refacciones si es edicion de cotizacion
        if ($scope.$parent.$parent.cotizacionActual.length > 0) {
          setTimeout(function() {
            $scope.spinner = $scope.spinner2 = false;
            $scope.cotizacionActual = $scope.$parent.$parent.cotizacionActual
            $scope.$apply()
          }, 1)
        } else {
          if ($scope.folioActual != "TEMP") {
            Cotizacion.get({
              id: $scope.folioActual
            }, function(data) {
              $scope.$parent.$parent.cotizacionActual = $scope.cotizacionActual = data.data;
              setTimeout(function() {
                $scope.$parent.$parent.guardarModal = false
                $scope.guardar = false;
                $scope.spinner = $scope.spinner2 = false;
                $scope.$apply()
              }, 10)

            })
          }
        }

        $scope.$parent.$parent.hacerPedido = function(op) {
          console.log("Hacer pedido")
          new Promise(function(resolve, reject) {
            if (op == 0) {
              bootbox.confirm("<h4>Esta a punto de realizar un pedido. ¿Esta seguro que la direccion de entrega y su cotización es correcta?</h4>",
                function(result) {
                  if (result)
                    resolve(op)
                  else
                    reject(op)
                }
              )
            }
          }).then(function(op) {
            new Promise(function(resolve, reject) {
              if ($scope.folioActual != "TEMP") {
                resolve($scope.folioActual)
              } else {
                Cotizacion.save({
                  idUsuario: $scope.user.per_idpersona,
                  refacciones: $scope.cotizacionActual,
                  descripcion: "Temp",
                  total: $scope.total,
                  empresa: $scope.empresaActual.emp_nombrecto,
                  sucursal: $scope.sucursalActual.suc_nombrecto,
                  base: "GAZM_Zaragoza"
                }, function(data) {
                  resolve(data.idCotizacion)
                })
              }
            }).then(function(idCotizacion) {
              console.log($scope.direccionActual)
              Pedido.save({
                idCotizacion: idCotizacion,
                idPersona: $scope.direccionActual.RTD_IDPERSONA,
                concecutivo: $scope.direccionActual.RTD_CONSEC,
                entrega: $scope.direccionActual.RTD_RTENTREGA,
                operacion: op,
                idPedido: 0,
                respuesta: 0
              }, function(data) {
                if (data.data.length > 0) {
                  $scope.backorder = $scope.$parent.$parent.backorder = true;
                  $scope.$parent.$parent.cotizacionActual = $scope.cotizacionActual = data.data;
                } else {
                  bootbox.alert("<h4>Su pedido fue realizado correctamente</h4>" +
                    "<h4>Su numero de entrega es 340211</h4>",
                    function() {
                      $state.go("user.cotizacion")
                    });
                }
              })

            }, function() {});
          })
        }
      })
    }
  }


  angular.module('refacciones')
    .component('confirmacion', {
      templateUrl: 'app/user/cotizacion/modalCotizacion/confirmacion/confirmacion.html',
      controller: ConfirmacionComponent,
      controllerAs: 'confirmacionCtrl'
    });

})();

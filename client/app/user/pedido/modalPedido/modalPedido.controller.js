'use strict';

(function() {

  class ModalPedidoComponent {

    initial($scope) {
     $scope.bunny = 'laura';
     
    }

    constructor($scope, $location, $state, User, Refaccion, Cotizacion, Pedido) {
      //Variables iniciales
      var self = this;

      /*$scope.empresaActual = $scope.$parent.$parent.$parent.empresaActual;
      $scope.sucursalActual = $scope.$parent.$parent.$parent.sucursalActual;
      $scope.folioActual = $scope.$parent.$parent.folioActual;
      $scope.direccionActual = $scope.$parent.$parent.direccionActual;
      $scope.total = $scope.$parent.$parent.total;
      $scope.backorder = $scope.$parent.$parent.backorder = false;;
      $scope.sinbackorder = $scope.$parent.$parent.sinbackorder = false;;
      $scope.spinner = true;
      $scope.spinner = true;
      $scope.idPedidoBP = 0;*/

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

        /*
        $scope.calcularTotal = function(op) {
          var totaltemp = 0;
          $scope.cotizacionActual.forEach(function(e) {
            console.log(e)
            if (op == 0) {
              totaltemp += e.PTS_PCOLISTA * e.cantidad
            } else if (op == 1) {
              totaltemp += e.PTS_PCOLISTA * (e.cantidad - e.faltante)
            }
          })
          $scope.total = $scope.$parent.$parent.total = totaltemp;
        }

        $scope.selectBackorder = function() {
          $scope.backorder = $scope.$parent.$parent.backorder = true;
          $scope.sinbackorder = $scope.$parent.$parent.sinbackorder = false;
          $scope.calcularTotal(0)
        }
        $scope.selectSinBackorder = function() {
          $scope.backorder = $scope.$parent.$parent.backorder = false;
          $scope.sinbackorder = $scope.$parent.$parent.sinbackorder = true;
          $scope.calcularTotal(1)
        }
        $scope.$parent.$parent.hacerPedido = function(op) {
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
            if (op == 1) {
              bootbox.confirm("<h4>Esta a punto de realizar un pedido sin backorder. ¿Esta seguro que la direccion de entrega y su cotización es correcta?</h4>",
                function(result) {
                  if (result)
                    resolve(op)
                  else
                    reject(op)
                }
              )
            } else if (op == 3) {
              resolve(op)
            }
          }).then(function(op) {
            new Promise(function(resolve, reject) {
              if ($scope.folioActual != "TEMP") {
                var cotizacionGuardar = {
                  idCotizacion: $scope.folioActual,
                  refacciones: $scope.cotizacionActual,
                  total: $scope.total,
                }
                Cotizacion.update(cotizacionGuardar, function(data) {
                  resolve($scope.folioActual)
                })

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
                idUsuario: $scope.user.per_idpersona,
                idCotizacion: idCotizacion,
                idPersona: $scope.direccionActual.RTD_IDPERSONA,
                concecutivo: $scope.direccionActual.RTD_CONSEC,
                entrega: $scope.direccionActual.RTD_RTENTREGA,
                operacion: op,
                idPedido: $scope.idPedidoBP,
              }, function(data) {
                if (data) {
                  console.log(data)
                  if (data.estatus == "ok") {
                    bootbox.alert("<h4>" + data.mensaje + "</h4>" +
                      "<p><h4>Folio Pedido BPRO: <font color='#1827F2'><B>" + data.idPedBPRO + "</B></font></h4>" +
                      "<p><h4>Su token de entrega es <font color='#1827F2'><B>" + data.token + "</B></font></h4>",
                      function() {
                        $state.go("user.cotizacion")
                      });
                  } else if (data.estatus == "ko") {
                    toastr.info(data.mensaje)
                    $scope.backorder = $scope.$parent.$parent.backorder = true;

                    if(data.data[0].totalPorSurtir > 0)  //totalPorSurtir
                       $scope.sinbackorderTotal = $scope.$parent.$parent.sinbackorderTotal = true;

                    $scope.sinbackorder = $scope.$parent.$parent.sinbackorder = true;

                    $scope.$parent.$parent.cotizacionActual = $scope.cotizacionActual = data.data;
                    $scope.idPedidoBP = data.idPedidoRef;
                  } else if (data.estatus == "cancelado") {
                    toastr.info(data.mensaje)
                    $state.go("user.cotizacion")
                  }
                }
              })

            }, function() {});
          })
        }
        */  

      })
    }
  }


  angular.module('refacciones')
    .component('modalPedido', {
      templateUrl: 'app/user/pedido/modalPedido/modalPedido.html',
      controller: ModalPedidoComponent
    });

})();
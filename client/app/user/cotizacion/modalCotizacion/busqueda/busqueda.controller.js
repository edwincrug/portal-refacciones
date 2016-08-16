'use strict';

(function() {

  class BusquedaComponent {

    initial($scope, Cotizacion) {
      $scope.busquedaActual = [];
      $scope.cotizacionActual = [];
      $scope.$parent.$parent.guardarModal = false
      $scope.guardar = false;
      $scope.templateActual = null;
    }



    calcularTotal(cotizaciones) {
      var total = 0;
      cotizaciones.forEach(function(data) {
        total += data.PTS_PCOLISTA * data.cantidad;
      })
      return total
    }

    constructor($scope, $location, $state, Refaccion, Cotizacion) {
      $scope.empresaActual = $scope.$parent.$parent.$parent.empresaActual;
      $scope.sucursalActual = $scope.$parent.$parent.$parent.sucursalActual;
      $scope.folioActual = $scope.$parent.$parent.folioActual;

      if ($scope.folioActual != "TEMP") {
        Cotizacion.get({
          id: $scope.folioActual
        }, function(data) {
          $scope.cotizacionActual = data.data;
          setTimeout(function() {

            $scope.$parent.$parent.guardarModal = false
            $scope.guardar = false;
            $scope.$apply()
          }, 10)

        })
      }

      var self = this;
      this.initial($scope)
      $scope.busquedaActual = []

      $scope.clearQuery = function() {
        $scope.refaccionBusqueda = ""
        $scope.busquedaActual = []

      }
      $scope.$watch('cotizacionActual', function(a, b) {
        $scope.$parent.$parent.total = $scope.total = self.calcularTotal($scope.cotizacionActual)
        if ($scope.cotizacionActual.length > 0) {
          $scope.$parent.$parent.guardarModal = true
          $scope.guardar = true;
        } else {
          $scope.$parent.$parent.guardarModal = false
          $scope.guardar = false;
        }
        console.log($scope.guardar)
      }, true);

      $scope.agregarACotizacion = function(refaccion) {
        var e = true;
        $scope.cotizacionActual.forEach(function(d, n) {
          if (d.PTS_IDPARTE == refaccion.PTS_IDPARTE) {
            $scope.cotizacionActual[n].cantidad += refaccion.cantidad
            e = false;
          }
        })
        if (e) {
          $scope.cotizacionActual.push(refaccion)
        }
        $scope.refaccionBusqueda = ""
        $scope.busquedaActual = []
      }

      $scope.guadarCotizacionBack = function() {
        console.log($scope.folioActual)
        if ($scope.folioActual == "TEMP") {
          bootbox.prompt({
            title: "Introduce una descripcion a la cotizacion",
            callback: function(result) {
              if (result != null && result != "") {
                var cotizacionGuardar = {
                  idUsuario: 11,
                  refacciones: $scope.cotizacionActual,
                  descripcion: result,
                  total: $scope.total,
                  empresa: $scope.empresaActual.emp_nombrecto,
                  sucursal: $scope.sucursalActual.suc_nombrecto,
                  base: "GAZM_Zaragoza"

                }
                Cotizacion.save(cotizacionGuardar, function(data) {
                  $state.go("user.cotizacion.modal.busqueda", {
                    id: data.idCotizacion
                  })
                  $scope.$parent.$parent.$parent.cambioSucursal()
                  toastr.success(data.mensaje)

                  $scope.$parent.$parent.guardarModal = false
                  $scope.guardar = false;

                })
              }
            }
          })
        }else{
          var cotizacionGuardar = {
            idCotizacion: $scope.folioActual,
            refacciones: $scope.cotizacionActual,
            total: $scope.total,
          }
          Cotizacion.update(cotizacionGuardar, function(data) {
            $scope.$parent.$parent.$parent.cambioSucursal()
            toastr.success(data.mensaje)
            $scope.$parent.$parent.guardarModal = false
            $scope.guardar = false;

          })

        }
      }
      // Guardado del template
      $scope.guadarTemplateBack = function() {
        console.log($scope.templateActual)
        if ($scope.$scope.templateActual == null) {
          bootbox.prompt({
            title: "Introduce un nombre para el nuevo pedido recurrente",
            callback: function(result) {
              if (result != null && result != "") {
                var cotizacionGuardar = {
                  idUsuario: 11,
                  refacciones: $scope.cotizacionActual,
                  descripcion: result,
                  total: $scope.total,
                  empresa: $scope.empresaActual.emp_nombrecto,
                  sucursal: $scope.sucursalActual.suc_nombrecto,
                  base: "GAZM_Zaragoza"

                }
                Cotizacion.save(cotizacionGuardar, function(data) {
                  $state.go("user.cotizacion.modal.busqueda", {
                    id: data.idCotizacion
                  })
                  $scope.$parent.$parent.$parent.cambioSucursal()
                  toastr.success(data.mensaje)

                  $scope.$parent.$parent.guardarModal = false
                  $scope.guardar = false;

                })
              }
            }
          })
        }else{
          var cotizacionGuardar = {
            idCotizacion: $scope.folioActual,
            refacciones: $scope.cotizacionActual,
            total: $scope.total,
          }
          Cotizacion.update(cotizacionGuardar, function(data) {
            $scope.$parent.$parent.$parent.cambioSucursal()
            toastr.success(data.mensaje)
            $scope.$parent.$parent.guardarModal = false
            $scope.guardar = false;
          })

        }
      }

      $scope.borrarCotizacion = function(refaccion) {
        $scope.cotizacionActual.forEach(function(d, n) {
          if (d.PTS_IDPARTE == refaccion.PTS_IDPARTE) {
            $scope.cotizacionActual.splice(n, 1);
          }
        })
      }

      $scope.buscarRefaccion = function() {
        if ($scope.refaccionBusqueda.length > 2) {
          Refaccion.query({
            query: $scope.refaccionBusqueda
          }, function(data) {
            data.forEach(function(d) {
              d.cantidad = 1;
            })
            $scope.busquedaActual = data;
          })
        } else {
          $scope.busquedaActual = []
        }
      }
    }
  }

  angular.module('refacciones')
    .component('busqueda', {
      templateUrl: 'app/user/cotizacion/modalCotizacion/busqueda/busqueda.html',
      controller: BusquedaComponent,
      controllerAs: 'busquedaCtrl'
    });

})();

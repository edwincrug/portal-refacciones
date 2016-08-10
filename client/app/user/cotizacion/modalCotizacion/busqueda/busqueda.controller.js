'use strict';

(function() {

  class BusquedaComponent {

    initial($scope, Cotizacion) {
      $scope.busquedaActual = [];
      $scope.cotizacionActual = [];
    }

    calcularTotal(cotizaciones){
        var total = 0;
        cotizaciones.forEach(function(data){
            total += data.PTS_PCOLISTA * data.cantidad;
        })
        console.log(total)
        return  total
    }

    constructor($scope,$state,Refaccion, Cotizacion) {
      $scope.empresaActual = $scope.$parent.$parent.$parent.empresaActual;
      $scope.sucursalActual = $scope.$parent.$parent.$parent.sucursalActual;
      /*console.log($scope.empresaActual.emp_nombrecto)
      console.log($scope.sucursalActual.suc_nombrecto)*/
      var self = this;
      this.initial($scope)
      $scope.busquedaActual = []
      $scope.clearQuery = function() {
        $scope.refaccionBusqueda = ""
        $scope.busquedaActual = []
      }

      $scope.$watch('cotizacionActual', function() {
            $scope.$parent.$parent.total = $scope.total = self.calcularTotal($scope.cotizacionActual)
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
                console.log(data)
                toastr.success(data.mensaje)
              })
            }
          }
        })

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

'use strict';

(function() {

  class EntregaComponent {


    constructor($scope, $location, $state, $stateParams, User, Direccion, Geocoding) {
      //Variables iniciales
      $scope.empresaActual = $scope.$parent.$parent.$parent.empresaActual;
      $scope.sucursalActual = $scope.$parent.$parent.$parent.sucursalActual;
      $scope.folioActual = $scope.$parent.$parent.folioActual;

      if ($scope.$parent.$parent.cotizacionActual)
        $scope.cotizacionActual = $scope.$parent.$parent.cotizacionActual;

      $scope.mapaActual = "https://www.google.com/maps/embed/v1/view?key=AIzaSyBNoVwlP2bV9DIOqRcZc2VPVR_A6psQKLY&center=19.435203,-99.1649484&zoom=11"
      User.get(function(data) {
        $scope.user = data;

        Direccion.query({
          user: $scope.user.per_idpersona,
          base: $scope.empresaActual.base
        }, function(data) {
          $scope.direcciones = data;
          if ($scope.$parent.$parent.direccionActual) {
            $scope.direccionActual = $scope.$parent.$parent.direccionActual;
            $scope.direcciones.forEach(function(e, i) {
              console.log(e)
              if (e.RTD_CONSEC == $scope.direccionActual.RTD_CONSEC &&
                e.RTD_IDPERSONA == $scope.direccionActual.RTD_IDPERSONA &&
                e.RTD_RTENTREGA == $scope.direccionActual.RTD_RTENTREGA) {

                console.log($scope.direccionActual)
                $scope.direcciones[i].selected = true;
              } else {
                $scope.direcciones[i].selected = false;
              }
            })
          }
          if ($scope.direcciones.length == 0) {
            $('#demo-step-wz').find('.next').hide();
            $('#demo-step-wz').find('.finish').show();
          }
        })
      })

      $scope.elegirDireccion = function(direccion) {
        $scope.$parent.$parent.direccionActual = direccion;
        var dir = direccion.RTD_CALLE1 + " " + direccion.RTD_NUMEXTER + " " + direccion.RTD_COLONIA + " " + direccion.RTD_DELEGAC + " " + direccion.RTD_CIUDAD + " " + direccion.RTD_CODPOS;
        $scope.mapaActual = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBNoVwlP2bV9DIOqRcZc2VPVR_A6psQKLY&q=" + dir
      }
    }
  }



  angular.module('refacciones')
    .component('entrega', {
      templateUrl: 'app/user/cotizacion/modalCotizacion/entrega/entrega.html',
      controller: EntregaComponent,
    });

})();

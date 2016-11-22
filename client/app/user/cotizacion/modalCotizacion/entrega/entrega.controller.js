'use strict';

(function() {

  class EntregaComponent {


    constructor($scope, $location, $state, $stateParams, User, Direccion, Geocoding) {
      //Variables iniciales
      $scope.empresaActual = $scope.$parent.$parent.$parent.empresaActual;
      $scope.sucursalActual = $scope.$parent.$parent.$parent.sucursalActual;
      $scope.folioActual = $scope.$parent.$parent.folioActual;
      $scope.spinner = $scope.spinner2 = true;
      $("iframe").load(function() {
        console.log("Cargado")
        $scope.spinner2 = false;
        $scope.$apply()
      })
      if ($scope.$parent.$parent.cotizacionActual)
        $scope.cotizacionActual = $scope.$parent.$parent.cotizacionActual;

      $scope.mapaActual = "https://www.google.com/maps/embed/v1/view?key=AIzaSyBFoh96sELDelI27Pfwk5mGLsqFYt99AZM&center=19.435203,-99.1649484&zoom=11" //"https://www.google.com/maps/embed/v1/view?key=AIzaSyBNoVwlP2bV9DIOqRcZc2VPVR_A6psQKLY&center=19.435203,-99.1649484&zoom=11"
      User.get(function(data) {
        $scope.user = data;

        Direccion.query({
          idUsuario: $scope.user.per_idpersona,
          idEmpresa: $scope.empresaActual.emp_idempresa,
          idSucursal: $scope.sucursalActual.AGENCIA,
          opcion: 1,
          idEstatus: 1
        }, function(data) {
          $scope.direcciones = data;
          if ($scope.$parent.$parent.direccionActual) {
            $scope.direccionActual = $scope.$parent.$parent.direccionActual;
            $scope.elegirDireccion($scope.direccionActual)
            $scope.direcciones.forEach(function(e, i) {

              if (e.RTD_CONSEC == $scope.direccionActual.RTD_CONSEC &&
                e.RTD_IDPERSONA == $scope.direccionActual.RTD_IDPERSONA &&
                e.RTD_RTENTREGA == $scope.direccionActual.RTD_RTENTREGA) {

                $scope.direcciones[i].selected = true;
              } else {
                $scope.direcciones[i].selected = false;
              }
            })
          }
          $scope.spinner = false;
          if ($scope.direcciones.length == 0) {
            $('#demo-step-wz').find('.next').hide();
            $('#demo-step-wz').find('.finish').show();
          }
        })
      })

      $scope.elegirDireccion = function(direccion) {
        $scope.spinner2 = true;
        $scope.$parent.$parent.direccionActual = direccion;
        var dir = direccion.RTD_CALLE1 + " " + direccion.RTD_NUMEXTER + " " + direccion.RTD_COLONIA + " " + direccion.RTD_DELEGAC + " " + direccion.RTD_CIUDAD + " " + direccion.RTD_CODPOS;
        $scope.mapaActual = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFoh96sELDelI27Pfwk5mGLsqFYt99AZM&q=" + dir
        //$scope.mapaActual = "https://www.google.com/maps/embed/v1/view?key=AIzaSyBFoh96sELDelI27Pfwk5mGLsqFYt99AZM&q=" + dir
      }
    }
  }

  angular.module('refacciones')
    .component('entrega', {
      templateUrl: 'app/user/cotizacion/modalCotizacion/entrega/entrega.html',
      controller: EntregaComponent,
    });

})();

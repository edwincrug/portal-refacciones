'use strict';

class ModalCotizacionComponent {
  constructor($state) {
    console.log("Abrir modal")
    $('.modal-cotizacion').modal('show')
    $('.modal-cotizacion').on('shown.bs.modal', function(e) {
      var moveIt = $(".modal-backdrop").remove();
      $("#modal-cotizacion-container").append(moveIt);
      $("#navbar").css("position", "static");
      $("#footer").css("position", "static");
    })
    $('.modal-cotizacion').on('hidden.bs.modal', function(e) {
      $("#navbar").css("position","absolute");
      $("#footer").css("position","absolute");
      $state.go("user.cotizacion")
    })

  }
}

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider
      .state('user.cotizacion.modal', {
        url: '/nueva',
        templateUrl: 'app/user/cotizacion/modalCotizacion/modalCotizacion.html',
        controller: ModalCotizacionComponent,
        //abstract: true
      });
  });

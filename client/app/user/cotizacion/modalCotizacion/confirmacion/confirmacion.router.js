'use strict';

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider
      .state('user.cotizacion.modal.confirmacion', {
        url: '/confirmacion/',
        template: '<confirmacion></confirmacion>'
      });
  });

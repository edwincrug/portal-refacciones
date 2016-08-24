'use strict';

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider
      .state('user.cotizacion.modal.entrega', {
        url: '/entrega/',
        template: '<entrega></entrega>'
      });
  });

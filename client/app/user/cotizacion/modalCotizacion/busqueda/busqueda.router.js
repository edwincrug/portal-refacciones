'use strict';

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider
      .state('user.cotizacion.modal.busqueda', {
        url:'/busqueda',
        template: '<busqueda></busqueda>'
      });
  });

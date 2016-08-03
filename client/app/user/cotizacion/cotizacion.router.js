'use strict';

angular.module('refacciones')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user.cotizacion', {
        url: 'cotizacion',
        template: '<cotizacion></cotizacion>',
        authenticate:true
      });
  });

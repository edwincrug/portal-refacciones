'use strict';

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider
      .state('user.aprobacion', {
        url: 'aprobacion',
        template: '<aprobacion></aprobacion>',
        authenticate: true
      });
  });
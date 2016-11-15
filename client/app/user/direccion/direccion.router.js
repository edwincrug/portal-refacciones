'use strict';

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider
      .state('user.direccion', {
        url: 'direccion',
        template: '<direccion></direccion>',
        authenticate: true
      });
  });

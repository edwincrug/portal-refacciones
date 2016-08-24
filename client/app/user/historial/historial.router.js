'use strict';

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider
      .state('user.historial', {
        url: 'historial',
        template: '<historial></historial>',
        authenticate: true
      });
  });

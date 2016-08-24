'use strict';

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider
      .state('user.pedido', {
        url: 'pedido',
        template: '<pedido></pedido>',
        authenticate: true
      });
  });

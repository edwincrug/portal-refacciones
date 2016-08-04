'use strict';

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider.state('user', {
      url: '/',
      abstract: true,
      views: {
        admin: {
          templateUrl: 'app/user/user.html',
          authenticate: true
        },
        modal: {
          templateUrl: 'app/user/modalCotizacion/modalCotizacion.html',
        }
      }
    });
  });

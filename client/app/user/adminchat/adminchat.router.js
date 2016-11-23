'use strict';

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider
      .state('user.adminchat', {
        url: 'adminchat',
        template: '<adminchat></adminchat>',
        authenticate: true
      });
  });

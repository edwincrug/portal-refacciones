'use strict';

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider.state('user', {
      url: '/',
      abstract: true,
      templateUrl: 'app/user/user.html',
      authenticate: true

    });
  });

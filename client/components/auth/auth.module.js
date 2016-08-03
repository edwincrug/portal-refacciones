'use strict';

angular.module('refacciones.auth', ['refacciones.constants', 'refacciones.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

'use strict';

angular.module('baseApp.auth', ['baseApp.constants', 'baseApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

'use strict';

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider.state('user', {
        url: '/',
        abstract: true,
        templateUrl: 'app/user/user.html',
        authenticate:true

      })
      /*.state('user.contizacion', {
        url: '/cotizaciones',
        templateUrl: 'index.html'
      })
      .state('parent.contact', {
        url: '/contact',
        templateUrl: 'contact.html'
      })

    .state('admin', {
      url: '/admin',
      templateUrl: 'app/admin/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin',
      authenticate: 'admin'
    });*/
  });

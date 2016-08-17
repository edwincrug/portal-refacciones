
  'use strict';

  function templateService($resource) {
    return $resource('/api/template/:id', {
      id: '@_id'
    }, {
      'update': {
        method: 'PUT'
      }
    })
  }

  angular.module('refacciones')
    .service('Template', templateService);

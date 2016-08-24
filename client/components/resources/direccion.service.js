'use strict';

function direccionService($resource) {
  return $resource('/api/direccion/:id', {
    id: '@_id'
  }, {
    'update': {
      method: 'PUT'
    }
  })
}

angular.module('refacciones')
  .service('Direccion', direccionService);

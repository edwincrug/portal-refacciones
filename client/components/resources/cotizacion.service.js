'use strict';

function cotizacionService($resource) {
  return $resource('/api/cotizacion/:id', {
    id: '@_id'
  }, {
    'update': {
      method: 'PUT'
    }
  })
}

angular.module('refacciones')
  .service('Cotizacion', cotizacionService);

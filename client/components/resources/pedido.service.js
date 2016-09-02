'use strict';

function pedidoService($resource) {
  return $resource('/api/pedido/:id', {
    id: '@_id'
  }, {
    'update': {
      method: 'PUT'
    }
  })
}

angular.module('refacciones')
  .service('Pedido', pedidoService);

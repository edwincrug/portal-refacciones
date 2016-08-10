'use strict';

function cotizacionService($resource) {
  return $resource('/api/cotizacion/')
}

angular.module('refacciones')
  .service('Cotizacion', cotizacionService);

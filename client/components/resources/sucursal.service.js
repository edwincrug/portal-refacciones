'use strict';

function sucursalService($resource) {
  return $resource('/api/sucursal/')
	// AngularJS will instantiate a singleton by calling "new" on this function
}

angular.module('refacciones')
  .service('Sucursal', sucursalService);

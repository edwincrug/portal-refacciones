'use strict';

function vendedorService($resource) {
  return $resource('/api/vendedor/')
	// AngularJS will instantiate a singleton by calling "new" on this function
}

angular.module('refacciones')
  .service('Vendedor', vendedorService);
'use strict';

function empresaService($resource) {
  return $resource('/api/empresa/')
	// AngularJS will instantiate a singleton by calling "new" on this function
}

angular.module('refacciones')
  .service('Empresa', empresaService);

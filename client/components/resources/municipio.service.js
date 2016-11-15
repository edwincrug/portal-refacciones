'use strict';

function municipioService($resource) {
  return $resource('/api/municipio/')
	// AngularJS will instantiate a singleton by calling "new" on this function
}

angular.module('refacciones')
  .service('Municipio', municipioService);
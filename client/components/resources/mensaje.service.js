'use strict';

function mensajeService($resource) {
  return $resource('/api/mensaje/')
	// AngularJS will instantiate a singleton by calling "new" on this function
}

angular.module('refacciones')
  .service('Mensaje', mensajeService);

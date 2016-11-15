'use strict';

function coloniaService($resource) {
  return $resource('/api/colonia/')
	// AngularJS will instantiate a singleton by calling "new" on this function
}

angular.module('refacciones')
  .service('Colonia', coloniaService);
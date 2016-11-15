'use strict';

function ciudadService($resource) {
  return $resource('/api/ciudad/')
	// AngularJS will instantiate a singleton by calling "new" on this function
}

angular.module('refacciones')
  .service('Ciudad', ciudadService);
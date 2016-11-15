'use strict';

function cpService($resource) {
  return $resource('/api/cp/')
	// AngularJS will instantiate a singleton by calling "new" on this function
}

angular.module('refacciones')
  .service('Cp', cpService);
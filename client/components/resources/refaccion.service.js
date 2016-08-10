'use strict';

function refaccionService($resource) {
  return $resource('/api/refaccion/')
	// AngularJS will instantiate a singleton by calling "new" on this function
}

angular.module('refacciones')
  .service('Refaccion', refaccionService);

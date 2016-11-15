'use strict';

function estadoService($resource) {
  return $resource('/api/estado/')
	// AngularJS will instantiate a singleton by calling "new" on this function
}

angular.module('refacciones')
  .service('Estado', estadoService);
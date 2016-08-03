'use strict';

(function(){

class CotizacionComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('refacciones')
  .component('cotizacion', {
    templateUrl: 'app/user/cotizacion/cotizacion.html',
    controller: CotizacionComponent,
    controllerAs: 'cotizacionCtrl'
  });

})();

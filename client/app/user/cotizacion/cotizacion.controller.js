'use strict';

(function(){

class CotizacionComponent {
  constructor(Empresa) {
    Empresa.query({user:3},function(data){
      console.log(data[2].emp_nombre)
    })
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

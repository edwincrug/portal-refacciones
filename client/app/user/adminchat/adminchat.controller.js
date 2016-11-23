'use strict';

(function() {

    class adminchatComponent {
        constructor($scope, User, Empresa, Sucursal, Cotizacion) { } //fin constructor
    }

    angular.module('refacciones')
        .component('adminchat', {
            templateUrl: 'app/user/adminchat/adminchat.html',
            controller: adminchatComponent
        });

})();

'use strict';

class ModalHistorialComponent {
    constructor($state, $scope, $stateParams, Pedido, User) {
        $('.modal-historial').modal('show')
        $('.modal-historial').on('hidden.bs.modal', function(e) {
            $state.go("user.historial")
        })
        $scope.user = $scope.$parent.$parent.$parent.user;
        if ($scope.user == null) $state.go("user.historial")
        console.log('stateParams :' + $stateParams)
        if ($stateParams.id) {
            console.log($scope.user)
            Pedido.get({
                id: $stateParams.id,
                user: $scope.user.per_idpersona
            }, function(data) {

                console.log('bunny success!')
                console.log(data)
                $scope.detalles = data.data;
                var i = 0;
                $scope.subtotal = 0;
                angular.forEach($scope.detalles, function(value, key) {
                    $scope.subtotal += $scope.detalles[i].totalItem;
                    i++;
                });
                //$scope.detalles=$scope.detallesdata.data[0];

            })
        } else {
            console.log('empty')
        }

    }
}

angular.module('refacciones')
    .config(function($stateProvider) {
        $stateProvider
            .state('user.historial.modal', {
                url: '/:id',
                templateUrl: 'app/user/historial/modalHistorial/modalHistorial.html',
                controller: ModalHistorialComponent
            });
    });

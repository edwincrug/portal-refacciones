'use strict';

class ModalPedidoComponent {
  constructor($state, $scope, $stateParams, Pedido, User) {
    $('.modal-pedido').modal('show')
    $('.modal-pedido').on('hidden.bs.modal', function(e) {
      $state.go("user.pedido")
    })
    $scope.user = $scope.$parent.$parent.$parent.user;
    console.log($stateParams)
    if ($stateParams.id) {
      console.log($scope.user)
      Pedido.get({
        id: $stateParams.id,
        user: $scope.user.per_idpersona
      }, function(data) {

      })
    } else {

    }

  }
}

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider
      .state('user.pedido.modal', {
        url: '/:id',
        templateUrl: 'app/user/pedido/modalPedido/modalPedido.html',
        controller: ModalPedidoComponent,
      });
  });

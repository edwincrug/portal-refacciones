'use strict';

class ModalPedidoComponent {
  constructor($state, $scope, $stateParams, Pedido, User) {

    $scope.bunny = 'some bunny';

    $('.modal-pedido').modal('show')
    $('.modal-pedido').on('hidden.bs.modal', function(e) {
      $state.go("user.pedido")
    })
    $scope.user = $scope.$parent.$parent.$parent.user;
    if($scope.user== null)  $state.go("user.pedido")
    console.log('stateParams :' + $stateParams)
    if ($stateParams.id) {
      console.log($scope.user)
      console.log($stateParams.id)
      Pedido.get({
        id: $stateParams.id,
        user: $scope.user.per_idpersona,        
      }, function(data) {

        console.log('bunny success!');
        console.log(data.data);        
        $scope.detalles = data.data;

        console.log($scope.detalles.length);

        $scope.totalPedido = 0;        

        data.data.forEach(function(entry){
          $scope.totalPedido += entry.totalItem;
        },this);
        
      })
    } else {
        console.log('empty')
    }

  }
}

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider
      .state('user.pedido.modal', {
        url: '/:id',
        templateUrl: 'app/user/pedido/modalPedido/modalPedido.html',
        controller: ModalPedidoComponent
      });
  });
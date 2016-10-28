'use strict';

class InvoiceComponent {
    constructor($state, $scope, $stateParams, Pedido, User) {

        $scope.bunny = 'some bunny';

        /*$('.modal-pedido').modal('show')
        $('.modal-pedido').on('hidden.bs.modal', function(e) {
            $state.go("user.pedido")
        })
        $scope.user = $scope.$parent.$parent.$parent.user;
        if ($scope.user == null) $state.go("user.pedido")
        console.log('stateParams :' + $stateParams)
        if ($stateParams.id) {
            console.log($scope.user)
            console.log($stateParams)
            console.log($stateParams.idcolor)
            $scope.colorEstatus = '#' + $stateParams.idcolor
            $scope.estatus = $stateParams.estatus
            //console.log($stateParams.idcolor)
            Pedido.get({
                id: $stateParams.id,
                user: $scope.user.per_idpersona,
            }, function(data) {
                console.log('bunny success!');
                console.log(data);
                console.log(data.data);
                $scope.detalles = data.data;
                $scope.empresa = data;

                var i=0;
                $scope.subtotal=0;
                angular.forEach($scope.detalles, function(value, key) {
                  $scope.subtotal+= $scope.detalles[i].totalItem;
                  i++;
                });

                $scope.idpedido = $stateParams.idpedido;
                console.log($scope.detalles.length);

                $scope.totalPedido = 0;

                data.data.forEach(function(entry) {
                    $scope.totalPedido += entry.totalItem;
                }, this);

            })
        } else {
            console.log('empty')
        }

        $scope.imprimir = function() {          

          var objeto=document.getElementById('imprimeme');  //obtenemos el objeto a imprimir
          var ventana=window.open('','_blank');  //abrimos una ventana vacía nueva

            var style = ventana.document.createElement('link');
            style.type = "text/css";
            style.rel = "stylesheet";
            style.href = "components/plugins/nifty/nifty.css";
            style.media = "all";

            ventana.document.write('<html><head><title>Detalle Pedido</title>');
            
            /*ventana.document.write('<link rel="stylesheet" href="bower_components/components-font-awesome/css/font-awesome.css" />');
            ventana.document.write('<link rel="stylesheet" href="bower_components/bootstrap-table/src/bootstrap-table.css" />');
            

            ventana.document.write('<link rel="stylesheet" href="components/portal.css" />');
            ventana.document.write('<link rel="stylesheet" href="components/style.css" />');
            //ventana.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />');
            
            //ventana.document.write("<link rel='stylesheet' href='app/user/pedido/pedido.css' />");
            
            
            ventana.document.write('</head><body>');
            ventana.document.write(objeto.innerHTML);   //imprimimos el HTML del objeto en la nueva ventana
            ventana.document.write('</body></html>');

            ventana.document.getElementsByTagName("head")[0].appendChild(style);

            ventana.document.close();  //cerramos el documento
            ventana.print();  //imprimimos la ventana
            ventana.close();  //cerramos la ventana
        }*/

    }
}

angular.module('refacciones')
    .config(function($stateProvider) {
        $stateProvider
            .state('user.invoice.modal', {
                url: '/:id',
                templateUrl: 'app/user/pedido/modalPedido/invoice_print.html',
                controller: InvoiceComponent
            });
    });
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
            console.log($stateParams.id)
            $scope.colorEstatus = '#' + $stateParams.idcolor
            $scope.idFactura = $stateParams.idFactura
            Pedido.get({
                id: $stateParams.id,
                user: $scope.user.per_idpersona
            }, function(data) {

                console.log('bunny success!')
                console.log(data)
                $scope.detalles = data.data;
                $scope.empresa = data;

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


        $scope.imprimir = function() {



            var objeto = document.getElementById('imprimeme'); //obtenemos el objeto a imprimir

            var ventana = window.open('', 'my div', 'height=400,width=600'); //window.open('','_blank');  //abrimos una ventana vacía nueva
            //var mywindow = window.open('', 'my div', 'height=400,width=600');

            /*var style = ventana.document.createElement('link');
            style.type = "text/css";
            style.rel = "stylesheet";
            style.href = 'components/plugins/nifty/nifty.css';
            style.media = "all";*/


            ventana.document.write('<html><head><title>Detalle Pedido</title>');

            ventana.document.write('<style type="text/css">');
            //ventana.document.write('body {margin:0; padding:0; line-height: 1.4em; word-spacing:1px; letter-spacing:0.2px; font: 10px Arial, Helvetica,"Lucida Grande", serif; color: #000;}');
            ventana.document.write('.label2 {background-color: #389DF5;}');
            ventana.document.write('</style>');

            /*ventana.document.write('<link rel="stylesheet" href="bower_components/components-font-awesome/css/font-awesome.css" />');
            ventana.document.write('<link rel="stylesheet" href="bower_components/bootstrap-table/src/bootstrap-table.css" />');
            

            ventana.document.write('<link rel="stylesheet" href="components/portal.css" />');
            ventana.document.write('<link rel="stylesheet" href="components/style.css" />');*/
            //ventana.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />');

            //ventana.document.write("<link rel='stylesheet' href='app/user/pedido/pedido.css' />");            

            //console.log(objeto.innerHTML);

            ventana.document.write('</head><body>');
            ventana.document.write(objeto.innerHTML); //imprimimos el HTML del objeto en la nueva ventana
            ventana.document.write('</body></html>');

            //ventana.document.getElementsByTagName("head")[0].appendChild(style);

            ventana.document.close(); //cerramos el documento
            ventana.print(); //imprimimos la ventana
            ventana.close(); //cerramos la ventana
        }

    }
}

angular.module('refacciones')
    .config(function($stateProvider) {
        $stateProvider
            .state('user.historial.modal', {
                url: '/:id/:idcolor/:idFactura',
                templateUrl: 'app/user/historial/modalHistorial/modalHistorial.html',
                controller: ModalHistorialComponent
            });
    });

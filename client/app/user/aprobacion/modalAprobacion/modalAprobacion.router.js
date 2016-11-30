'use strict';

class ModalAprobacionComponent {
    constructor($state, $scope, $stateParams, $http, User, Direccion, Vendedor) {

            $('.modal-aprobacion').modal('show')
            $('.modal-aprobacion').on('hidden.bs.modal', function(e) {
                $state.go("user.aprobacion")
            })

            $scope.user = $scope.$parent.$parent.$parent.user;
            if ($scope.user == null) $state.go("user.pedido")
            console.log('stateParams :' + $stateParams)
            if ($stateParams.id) {

                $scope.idDireccion = $stateParams.id;
                console.log($scope.user)
                console.log($stateParams)
                $scope.cliente = $scope.user.name;

                Direccion.get({
                    idUsuario: $scope.user.per_idpersona,
                    /*idEmpresa: $scope.empresaActual.emp_idempresa,
                    idSucursal: $scope.sucursalActual.AGENCIA,
                    idEstatus: 1,*/
                    id: 1,
                    idDireccion: $stateParams.id
                }, function(data) {

                    console.log('direccion aprobar success!')
                    console.log(data)
                    console.log(data.data)

                    $scope.direccion = data.data[0];

                    console.log('compbante:')
                    console.log($scope.direccion.comprobante)

                    Direccion.query({
                            idUsuario: $scope.user.per_idpersona,
                            idEmpresa: $scope.empresaActual.emp_idempresa,
                            idSucursal: $scope.sucursalActual.AGENCIA,
                            idDireccion: $stateParams.id,
                            opcion: 3
                        }, function(data) {

                            console.log('rutas succes!')
                            console.log(data)

                            data.unshift({
                                RUT_IDRUTA: '',
                                RUT_NOMBRERT: "Selecciona ..."
                            })

                            $scope.rutas = data;
                            $scope.rutaActual = $scope.rutas[0];

                            $scope.listaRutas = data;

                            Vendedor.query({
                                idUsuario: $scope.user.per_idpersona,
                                idEmpresa: $scope.empresaActual.emp_idempresa,
                                idSucursal: $scope.sucursalActual.AGENCIA,
                                idDireccion: $stateParams.id
                            }, function(data) {

                                data.unshift({
                                    per_idpersona: '',
                                    nombre: "Selecciona ..."
                                })

                                $scope.vendedores = data;
                                $scope.vendedorActual = $scope.vendedores[0];

                            })

                        }) // fin Direccion.query

                })

            } else {
                console.log('empty')
            }

            /*

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

                    var i = 0;
                    $scope.subtotal = 0;
                    angular.forEach($scope.detalles, function(value, key) {
                        $scope.subtotal += $scope.detalles[i].totalItem;
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
            */

            $scope.muestraComprobante = function() {

                //$scope.idDireccion
                //alert(document.pressed);

                window.open('http://192.168.20.9/GA_Centralizacion/CuentasXCobrar/Refacciones/DireccionesCliente/' +  $scope.direccion.RTD_IDPERSONA + '/' + $stateParams.id + '/' + $stateParams.id + '_comprobante.pdf', 'Comprobante de domicilio', 'height=400,width=600');

            }

            $scope.Procesar = function(operacion) {

                    console.log('Procesar')

                    var operacionCadena = (operacion == 2) ? 'Aprobar' : 'Rechazar';

                    new Promise(function(resolve, reject) {

                        $scope.cadenaConfirma = "<h4>Está a punto de " + operacionCadena + " esta dirección ¿Desea continuar?</h4>"

                        bootbox.confirm($scope.cadenaConfirma,
                            function(result) {
                                if (result)
                                    resolve(operacion)
                                else
                                    reject(operacion)
                            }
                        )
                    }).then(function(operacion) {

                        new Promise(function(resolve, reject) {

                            var direccion = {
                                idUsuario: $scope.user.per_idpersona,
                                idRuta: ($scope.rutaActual.RUT_IDRUTA == '') ? '0' : $scope.rutaActual.RUT_IDRUTA,//$scope.rutaActual.RUT_IDRUTA,
                                idDireccion: $stateParams.id,
                                operacionP: operacion,
                                idVendedor: ($scope.vendedorActual.per_idpersona == '') ? '0' : $scope.vendedorActual.per_idpersona//$scope.vendedorActual.per_idpersona
                            }

                            console.log('$scope.rutaActual')
                            console.log($scope.rutaActual)
                            console.log(direccion)

                            Direccion.update(direccion, function(data) {

                                console.log(data)

                                resolve(data)
                            })

                        }).then(function(respuesta) {

                            bootbox.alert("<h4>" + respuesta.mensaje + "</h4>",
                                function() {
                                    $('.modal-aprobacion').modal('hide')
                                        //$state.go("user.aprobacion")
                                });

                        })

                        /*
                        new Promise(function(resolve, reject) {
                            if ($scope.folioActual != "TEMP") {
                                var cotizacionGuardar = {
                                    idCotizacion: $scope.folioActual,
                                    refacciones: $scope.cotizacionActual,
                                    total: $scope.total,
                                }
                                Cotizacion.update(cotizacionGuardar, function(data) {
                                    resolve($scope.folioActual)
                                })

                            } else {
                                Cotizacion.save({
                                    idUsuario: $scope.user.per_idpersona,
                                    refacciones: $scope.cotizacionActual,
                                    descripcion: '',
                                    total: $scope.total,
                                    empresa: $scope.empresaActual.emp_idempresa, //LQMA comment 18102016 .emp_idempresa emp_nombrecto
                                    sucursal: $scope.sucursalActual.AGENCIA, //LQMA comment 18102016 .suc_nombrecto .AGENCIA
                                    base: ''
                                }, function(data) {
                                    //LQMA 18102016
                                    console.log(data)
                                    $scope.$parent.$parent.folioActual = $scope.$parent.$parent.folioActual.replace('TEMP', data.idCotizacion);
                                    resolve(data.idCotizacion)
                                })
                            }
                        }).then(function(idCotizacion) {
                            console.log($scope.direccionActual)
                            Pedido.save({
                                idUsuario: $scope.user.per_idpersona,
                                idCotizacion: idCotizacion,
                                idPersona: $scope.direccionActual.RTD_IDPERSONA,
                                concecutivo: $scope.direccionActual.RTD_CONSEC,
                                entrega: $scope.direccionActual.RTD_RTENTREGA,
                                operacion: op,
                                idPedido: $scope.idPedidoBP,
                            }, function(data) {
                                if (data) {

                                    console.log(data)
                                    if (data.estatus == "ok") {

                                        var folioBPRO = '';
                                        if (data.idPedBPRO == "0")
                                            folioBPRO = "<p><h4><font color='#1827F2'><B> Se ha generado un pedido en BACKORDER por las piezas faltantes.</B></font></h4>" +
                                            "<p><h4><font color='#CB0A14'><B>" + $scope.msgEntregaBackorder + "</B></font></h4>"
                                        else
                                            folioBPRO = "<p><h4>Folio Pedido: <font color='#1827F2'><B> " + data.idPedBPRO + "</B></font></h4>" +
                                            "<p><h4>Su token de entrega es: <font color='#1827F2'><B>" + data.token + "</B></font></h4>" +
                                            "<p><h4><font color='#1E1A93'><B>" + $scope.msgTiempoEntrega + "</B></font></h4>"


                                        console.log('back order?')
                                        console.log(data.backOrder)

                                        if (data.backOrder == "1")
                                            folioBPRO = folioBPRO + "<p><h4><font color='#1827F2'><B>Se ha generado un pedido en BACKORDER por las piezas faltantes.</B></font></h4>" +
                                            "<p><h4><font color='#CB0A14'><B>" + $scope.msgEntregaBackorder + "</B></font></h4>"


                                        bootbox.alert("<h4>" + data.mensaje + "</h4>" + folioBPRO,
                                            function() {
                                                $state.go("user.cotizacion")
                                            });

                                    } else if (data.estatus == "ko") {
                                        toastr.info(data.mensaje)
                                        $scope.backorder = $scope.$parent.$parent.backorder = true;

                                        if (data.data[0].totalPorSurtir > 0) //totalPorSurtir
                                            $scope.sinbackorderTotal = $scope.$parent.$parent.sinbackorderTotal = true;

                                        $scope.sinbackorder = $scope.$parent.$parent.sinbackorder = true;

                                        $scope.totalBackOrder = data.totalBackOrder;
                                        $scope.totalExistencia = data.totalExistencia;

                                        $scope.$parent.$parent.cotizacionActual = $scope.cotizacionActual = data.data;
                                        $scope.idPedidoBP = data.idPedidoRef;
                                    } else if (data.estatus == "cancelado") {
                                        toastr.info(data.mensaje)
                                        $state.go("user.cotizacion")
                                    }
                                }
                            })

                        }, function() {}); */


                    })

                } //fin Procesar

        } // fin constructor
} //fin ModalAprobacionController

angular.module('refacciones')
    .config(function($stateProvider) {
        $stateProvider
            .state('user.aprobacion.modal', {
                url: '/:id',
                templateUrl: 'app/user/aprobacion/modalAprobacion/modalAprobacion.html',
                controller: ModalAprobacionComponent
            });
    });

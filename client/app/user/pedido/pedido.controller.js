'use strict';

(function() {

    class PedidoComponent {
        constructor($scope, User, Empresa, Sucursal, Pedido) {

            
            $scope.sucursalActual = $scope.empresaActual = null;
            $scope.listaPedidos = [];
            User.get(function(data) {
                $scope.user = data;
                // Pedido.query({
                //     user: $scope.user.per_idpersona,
                //     estatus: 1,
                //   },
                //   function(data) {
                //     $scope.listaPedidos = data
                //     console.log(data)            
                //   })
                //Consigue la fecha actual
                var f = new Date();
                var fechafin = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
                //Consigue 30 dias antes de la fecha actual
                var fI = new Date();
                fI.setDate(fI.getDate() - 30);
                var fechaInicio = fI.getDate() + "/" + (fI.getMonth() + 1) + "/" + fI.getFullYear();
                //Para iniciar el datapicker 
                $('input[name="daterange"]').daterangepicker({
                    locale: {
                        format: 'DD/MM/YYYY'
                    },
                    startDate: fechaInicio,
                    endDate: fechafin
                });
                Empresa.query({
                    user: $scope.user.per_idpersona
                }, function(data) {
                    data.unshift({
                        emp_idempresa: 0,
                        emp_nombre: "Seleccioné ...",
                        emp_nombrecto: ""
                    })
                    $scope.empresas = data;
                    $scope.empresaActual = $scope.empresas[0];

                    //SET EMPRESA LOCALSTORAGE   BEGIN
                    if (localStorage.getItem('pedEmpresa') !== null) {

                        $scope.pedEmpresa = []

                        /*$scope.histEmpresa.push({
                                emp_idempresa: 0,
                                emp_nombre: "Seleccioné ...",
                                emp_nombrecto: ""
                            })*/

                        //$scope.histEmpresa = localStorage.getItem('histEmpresa')
                        $scope.tempPedEmp = localStorage.getItem('pedEmpresa')
                        $scope.pedEmpresa.push(JSON.parse($scope.tempPedEmp))

                        console.log('$scope.pedEmpresa')
                        console.log($scope.pedEmpresa[0][0])

                        setTimeout(function() {

                            $("#selEmpresas").val($scope.pedEmpresa[0][0].emp_idempresa);
                            $scope.empresaActual = $scope.pedEmpresa[0][0]; //$scope.empresas;

                            $scope.consultaSucursales();
                        }, 100);

                    } //SET EMPRESA LOCALSTORAGE  END
                })
            });

            //LQMA ADD 17102016 filtro Fecha
            $scope.filtroFecha = function() {


            }

            $scope.cambioEmpresa = function() {
                if ($scope.empresaActual.emp_idempresa != 0) {

                    $scope.pedEmpresa = []

                    $scope.pedEmpresa.push({
                            emp_idempresa: $scope.empresaActual.emp_idempresa,
                            emp_nombre: $scope.empresaActual.emp_nombre,
                            emp_nombrecto: $scope.empresaActual.emp_nombrecto
                        })
                        //$scope.histEmpresa.push($scope.empresaActual);
                    localStorage.setItem('pedEmpresa', JSON.stringify($scope.pedEmpresa));

                    $scope.consultaSucursales();

                } else {
                    $scope.sucursales = $scope.sucursalActual = null;
                    localStorage.removeItem('pedEmpresa')
                    localStorage.removeItem('pedSucursal')
                }
            }

            $scope.cambioSucursal = function(empresa, sucursal, fecha) {

                    $scope.consultaPedidos(empresa, sucursal, fecha);

                    if ($scope.sucursalActual.AGENCIA != 0) {

                        $scope.pedSucursal = []

                        $scope.pedSucursal.push({
                                AGENCIA: $scope.sucursalActual.AGENCIA,
                                NOMBRE_AGENCIA: $scope.sucursalActual.NOMBRE_AGENCIA,
                                IDSUC: $scope.sucursalActual.IDSUC,
                                suc_nombrecto: $scope.sucursalActual.suc_nombrecto
                            })
                            //$scope.histEmpresa.push($scope.empresaActual);
                        console.log('agregando sucursal actual a localStorage')
                        localStorage.setItem('pedSucursal', JSON.stringify($scope.pedSucursal));
                    } else {
                        localStorage.removeItem('pedSucursal')
                    }

                } //end cambioSucursal

            $scope.setTablePaging = function(idTable) {
                $('#' + idTable).DataTable({
                    dom: '<"html5buttons"B>lTfgitp',
                    order: [0, 'desc'],
                    buttons: [{
                        extend: 'copy'
                    }, {
                        extend: 'csv'
                    }, {
                        extend: 'excel',
                        title: 'ExampleFile'
                    }, {
                        extend: 'pdf',
                        title: 'ExampleFile'
                    }, {
                        extend: 'print',
                        customize: function(win) {
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');
                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                        }
                    }]
                });
            };

            $scope.consultaPedidos = function(empresa, sucursal, fecha) {

                    var fechaIF = fecha.split('-');

                    /* LQMA ADD 17102016 */

                    var modifechaInic = fechaIF[0].split('/') //'07/10/2016'.split('/');//nuevocontrato.fechaInicio.split('/');
                    var newDateIni = modifechaInic[2] + modifechaInic[1] + modifechaInic[0]//modifechaInic[1] + '/' + modifechaInic[0] + '/' + modifechaInic[2];
                    var modifechaTerm = fechaIF[1].split('/') //'10/10/2016'.split('/');//nuevocontrato.fechaTermino.split('/');
                    var newDateterm = modifechaTerm[2] + modifechaTerm[1] + modifechaTerm[0]//modifechaTerm[1] + '/' + modifechaTerm[0] + '/' + modifechaTerm[2];
                    //nuevocontrato.fechaInicio = newDateIni;
                    //nuevocontrato.fechaTermino = newDateterm;

                    Pedido.query({
                            user: $scope.user.per_idpersona,
                            estatus: 1,
                            empresa: empresa.emp_idempresa,
                            sucursal: sucursal.AGENCIA,
                            fechaI: newDateIni, //ADD LQMA 17102016
                            fechaF: newDateterm //ADD LQMA 17102016
                        },
                        function(data) {

                            $scope.listaPedidos = data;
                            //$scope.listaPedidos2 = data;

                            $('#tblPedidoFiltros').DataTable().destroy();

                            setTimeout(function() {
                                $scope.setTablePaging('tblPedidoFiltros');

                                $("#tblPedidoFiltros_length").removeClass("dataTables_info").addClass("hide-div");
                                $("#tblPedidoFiltros_filter").removeClass("dataTables_info").addClass("pull-left");

                            }, 1);

                            //console.log(data)            
                        })
                } //end consultaPedidos


            $scope.consultaSucursales = function() {

                    Sucursal.query({
                        user: $scope.user.per_idpersona,
                        empresa: $scope.empresaActual.emp_idempresa
                    }, function(data) {
                        data.unshift({
                            AGENCIA: "0",
                            NOMBRE_AGENCIA: "Seleccioné ...",
                            suc_nombrecto: ""
                        });
                        $scope.sucursales = data;
                        $scope.sucursalActual = $scope.sucursales[0];


                        //SET SUCURSAL DESDE LOCALSTORAGE   BEGIN
                        if (localStorage.getItem('pedSucursal') !== null) {

                            $scope.pedSucursal = []

                            //$scope.histEmpresa = localStorage.getItem('histEmpresa')
                            $scope.tempPedSuc = localStorage.getItem('pedSucursal')
                            $scope.pedSucursal.push(JSON.parse($scope.tempPedSuc))

                            console.log('$scope.pedSucursal')
                            console.log($scope.pedSucursal[0][0])

                            setTimeout(function() {

                                $("#selSucursales").val($scope.pedSucursal[0][0].AGENCIA);
                                $scope.sucursalActual = $scope.pedSucursal[0][0]; //$scope.empresas;

                                $scope.consultaPedidos($scope.empresaActual, $scope.sucursalActual, $scope.fecha);

                            }, 100);

                        } //SET SUCURSAL DESDE LOCALSTORAGE  END
                    })

                } //END consultaSucursales

        }
    }

    angular.module('refacciones')
        .component('pedido', {
            templateUrl: 'app/user/pedido/pedido.html',
            controller: PedidoComponent
        });

})();

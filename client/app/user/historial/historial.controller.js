'use strict';

(function() {

    class HistorialComponent {
        constructor($scope, User, Empresa, Sucursal, Pedido) {

            /******************************************************/

            //$scope.historicoEmpresa = localStorage.getItem('todos');

            //$scope.todos = (localStorage.getItem('todos') !== null) ? JSON.parse($scope.saved) : [{ text: 'Learn AngularJS', done: false }, { text: 'Build an Angular app', done: false }];

            $scope.histEmpresa = {};
            //localStorage.removeItem('histEmpresa')

            if (localStorage.getItem('histEmpresa') !== null) {

                //$scope.histEmpresa = localStorage.getItem('histEmpresa')
                console.log('existe algo en localstorage')
                    //console.log($scope.histEmpresa)

                /*angular.forEach($scope.histEmpresa, function(empresa) {
                    $scope.valorZ = empresa.text;
                });*/

                //console.log($scope.valorZ)
            } else {
                console.log('no hay nada en localstorage')
                $scope.histEmpresa = {};
            }

            //localStorage.setItem('todos', JSON.stringify($scope.todos));


            /*$scope.addTodo = function() {
                $scope.todos.push({
                    text: $scope.todoText,
                    done: false
                });
                $scope.todoText = ''; //clear the input after adding
                localStorage.setItem('todos', JSON.stringify($scope.todos));
            };

            $scope.remaining = function() {
                var count = 0;
                angular.forEach($scope.todos, function(todo) {
                    count += todo.done ? 0 : 1;
                });
                return count;
            };

            $scope.archive = function() {
                var oldTodos = $scope.todos;
                $scope.todos = [];
                angular.forEach(oldTodos, function(todo) {
                    if (!todo.done)
                        $scope.todos.push(todo);
                });
                localStorage.setItem('todos', JSON.stringify($scope.todos));
            };*/

            /**************************************************/

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

                    console.log(data)

                    $scope.empresas = data;
                    $scope.empresaActual = $scope.empresas[0];

                    //SET EMPRESA LOCALSTORAGE   BEGIN
                    if (localStorage.getItem('histEmpresa') !== null) {

                        $scope.histEmpresa = []

                        /*$scope.histEmpresa.push({
                                emp_idempresa: 0,
                                emp_nombre: "Seleccioné ...",
                                emp_nombrecto: ""
                            })*/

                        //$scope.histEmpresa = localStorage.getItem('histEmpresa')
                        $scope.tempHistEmp = localStorage.getItem('histEmpresa')
                        $scope.histEmpresa.push(JSON.parse($scope.tempHistEmp))

                        console.log('$scope.histEmpresa')
                        console.log($scope.histEmpresa[0][0])

                        setTimeout(function() {

                            $("#selEmpresas").val($scope.histEmpresa[0][0].emp_idempresa);
                            $scope.empresaActual = $scope.histEmpresa[0][0]; //$scope.empresas;

                            $scope.consultaSucursales();
                        }, 100);

                    } //SET EMPRESA LOCALSTORAGE  END

                })


            });

            $scope.cambioEmpresa = function() {
                if ($scope.empresaActual.emp_idempresa != 0) {

                    /****************/

                    //if (localStorage.getItem('todos') !== null) {                            
                    //console.log(sucursal)
                    //console.log($scope.histEmpresa)

                    $scope.histEmpresa = []
                    console.log('empresa actual')
                    console.log($scope.empresaActual)
                        //console.log($scope.empresaActual)

                    $scope.histEmpresa.push({
                            emp_idempresa: $scope.empresaActual.emp_idempresa,
                            emp_nombre: $scope.empresaActual.emp_nombre,
                            emp_nombrecto: $scope.empresaActual.emp_nombrecto
                        })
                        //$scope.histEmpresa.push($scope.empresaActual);
                    localStorage.setItem('histEmpresa', JSON.stringify($scope.histEmpresa));
                    //}

                    /****************/

                    /*Sucursal.query({
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

                     })*/
                    $scope.consultaSucursales();

                } else {
                    $scope.sucursales = $scope.sucursalActual = null;
                    localStorage.removeItem('histEmpresa')
                    localStorage.removeItem('histSucursal')
                }
            }

            $scope.cambioSucursal = function(empresa, sucursal, fecha) {

                $scope.consultaPedidos(empresa, sucursal, fecha);


                /*var fechaIF = fecha.split('-');

                var modifechaInic = fechaIF[0].split('/') //'07/10/2016'.split('/');//nuevocontrato.fechaInicio.split('/');
                var newDateIni = modifechaInic[1] + '/' + modifechaInic[0] + '/' + modifechaInic[2];
                var modifechaTerm = fechaIF[1].split('/') //'10/10/2016'.split('/');//nuevocontrato.fechaTermino.split('/');
                var newDateterm = modifechaTerm[1] + '/' + modifechaTerm[0] + '/' + modifechaTerm[2];

                Pedido.query({
                        user: $scope.user.per_idpersona,
                        estatus: 2,
                        empresa: empresa.emp_idempresa,
                        sucursal: sucursal.AGENCIA,
                        fechaI: newDateIni, //ADD LQMA 17102016
                        fechaF: newDateterm //ADD LQMA 17102016
                            //,
                            //fechaI: '12/10/2016',
                            //fechaF: '14/10/2016'
                    },
                    function(data) {
                        $scope.listaPedidos = data
                            //console.log(data)

                        $('#tblHistoricoFiltros').DataTable().destroy();

                        setTimeout(function() {
                            $scope.setTablePaging('tblHistoricoFiltros');

                            $("#tblHistoricoFiltros_length").removeClass("dataTables_info").addClass("hide-div");
                            $("#tblHistoricoFiltros_filter").removeClass("dataTables_info").addClass("pull-left");

                        }, 1);
                    })*/
                console.log($scope.sucursalActual)    

                if ($scope.sucursalActual.AGENCIA != 0) {

                    $scope.histSucursal = []
                    console.log('sucursal actual')
                    console.log($scope.sucursalActual)
                        //console.log($scope.empresaActual)

                    $scope.histSucursal.push({
                            AGENCIA: $scope.sucursalActual.AGENCIA,
                            NOMBRE_AGENCIA: $scope.sucursalActual.NOMBRE_AGENCIA,
                            IDSUC: $scope.sucursalActual.IDSUC,
                            suc_nombrecto: $scope.sucursalActual.suc_nombrecto
                        })
                        //$scope.histEmpresa.push($scope.empresaActual);
                        console.log('agregando sucursal actual a localStorage')
                    localStorage.setItem('histSucursal', JSON.stringify($scope.histSucursal));
                } else {
                    localStorage.removeItem('histSucursal')
                }
            }

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
            };//end setTablePaging


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
                    if (localStorage.getItem('histSucursal') !== null) {

                        $scope.histSucursal = []
                        
                        //$scope.histEmpresa = localStorage.getItem('histEmpresa')
                        $scope.tempHistSuc = localStorage.getItem('histSucursal')
                        $scope.histSucursal.push(JSON.parse($scope.tempHistSuc))

                        console.log('$scope.histSucursal')
                        console.log($scope.histSucursal[0][0])

                        setTimeout(function() {

                            $("#selSucursales").val($scope.histSucursal[0][0].AGENCIA);
                            $scope.sucursalActual = $scope.histSucursal[0][0]; //$scope.empresas;

                            $scope.consultaPedidos($scope.empresaActual, $scope.sucursalActual, $scope.fecha);
                            
                        }, 100);

                    } //SET SUCURSAL DESDE LOCALSTORAGE   END

                })
            }

            $scope.consultaPedidos = function(empresa, sucursal, fecha) {

                    var fechaIF = fecha.split('-');

                    var modifechaInic = fechaIF[0].split('/') //'07/10/2016'.split('/');//nuevocontrato.fechaInicio.split('/');
                    var newDateIni = modifechaInic[2] + modifechaInic[1] + modifechaInic[0]//modifechaInic[1] + '/' + modifechaInic[0] + '/' + modifechaInic[2];
                    var modifechaTerm = fechaIF[1].split('/') //'10/10/2016'.split('/');//nuevocontrato.fechaTermino.split('/');
                    var newDateterm = modifechaTerm[2] + modifechaTerm[1] + modifechaTerm[0]//modifechaTerm[1] + '/' + modifechaTerm[0] + '/' + modifechaTerm[2];

                    Pedido.query({
                            user: $scope.user.per_idpersona,
                            estatus: 2,
                            empresa: empresa.emp_idempresa,
                            sucursal: sucursal.AGENCIA,
                            fechaI: newDateIni, //ADD LQMA 17102016
                            fechaF: newDateterm //ADD LQMA 17102016
                                //,
                                //fechaI: '12/10/2016',
                                //fechaF: '14/10/2016'
                        },
                        function(data) {
                            $scope.listaPedidos = data
                                //console.log(data)

                            $('#tblHistoricoFiltros').DataTable().destroy();

                            setTimeout(function() {
                                $scope.setTablePaging('tblHistoricoFiltros');

                                $("#tblHistoricoFiltros_length").removeClass("dataTables_info").addClass("hide-div");
                                $("#tblHistoricoFiltros_filter").removeClass("dataTables_info").addClass("pull-left");

                            }, 1);

                        })
                } //fin consultaPedidos

        }
    }

    angular.module('refacciones')
        .component('historial', {
            templateUrl: 'app/user/historial/historial.html',
            controller: HistorialComponent
        });

})();

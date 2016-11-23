'use strict';

(function() {

    class AprobacionComponent {
        constructor($scope, User, Empresa, Sucursal, Direccion) {


            User.get(function(data) {

                console.log(Direccion)


                $scope.sucursalActual = $scope.empresaActual = null;
                $scope.user = data;
                $scope.listaCotizaciones = [];
                Empresa.query({
                    user: $scope.user.per_idpersona,
                    role: $scope.user.role
                }, function(data) {
                    data.unshift({
                        emp_idempresa: 0,
                        emp_nombre: "Selecciona ...",
                        emp_nombrecto: ""
                    })
                    $scope.empresas = data;
                    $scope.empresaActual = $scope.empresas[0];

                    //SET EMPRESA LOCALSTORAGE   BEGIN
                    if (localStorage.getItem('cotEmpresa') !== null) {

                        $scope.cotEmpresa = []

                        $scope.tempCotEmp = localStorage.getItem('cotEmpresa')
                        $scope.cotEmpresa.push(JSON.parse($scope.tempCotEmp))

                        setTimeout(function() {

                            $("#selEmpresas").val($scope.cotEmpresa[0][0].emp_idempresa);
                            $scope.empresaActual = $scope.cotEmpresa[0][0]; //$scope.empresas;

                            $scope.consultaSucursales();
                        }, 100);

                    } //SET EMPRESA LOCALSTORAGE  END
                })

                $scope.cambioEmpresa = function() {
                    if ($scope.empresaActual.emp_idempresa != 0) {

                        $scope.cotEmpresa = []

                        $scope.cotEmpresa.push({
                                emp_idempresa: $scope.empresaActual.emp_idempresa,
                                emp_nombre: $scope.empresaActual.emp_nombre,
                                emp_nombrecto: $scope.empresaActual.emp_nombrecto
                            })
                            //$scope.histEmpresa.push($scope.empresaActual);
                        localStorage.setItem('cotEmpresa', JSON.stringify($scope.cotEmpresa));

                        $scope.consultaSucursales();

                    } else {
                        $scope.sucursales = $scope.sucursalActual = null;
                        localStorage.removeItem('cotEmpresa')
                        localStorage.removeItem('cotSucursal')
                    }
                }

                $scope.cambioSucursal = function() {
                        $scope.consultaCotizaciones();

                        if ($scope.sucursalActual.AGENCIA != 0) {

                            //console.log($scope.sucursalActual)

                            $scope.cotSucursal = []

                            $scope.cotSucursal.push({
                                IDSUC: $scope.sucursalActual.IDSUC,
                                Con_LimCredito: $scope.sucursalActual.Con_LimCredito,
                                NOMBRE_AGENCIA: $scope.sucursalActual.NOMBRE_AGENCIA,
                                AGENCIA: $scope.sucursalActual.AGENCIA,
                                suc_nombrecto: $scope.sucursalActual.suc_nombrecto,
                                descuento: $scope.sucursalActual.descuento,
                                importe: $scope.sucursalActual.importe,
                                saldo: $scope.sucursalActual.saldo,
                                rfcSuc: $scope.sucursalActual.rfcSuc,
                                nombreSuc: $scope.sucursalActual.nombreSuc,
                                telSuc: $scope.sucursalActual.suc_nombrecto,
                                dirSuc: $scope.sucursalActual.dirSuc,
                                nomVendedor: $scope.sucursalActual.nomVendedor,
                                telVendedor: $scope.sucursalActual.telVendedor,
                                mailVendedor: $scope.sucursalActual.mailVendedor
                            })

                            console.log('set sucursal coti local')
                            localStorage.setItem('cotSucursal', JSON.stringify($scope.cotSucursal));
                        } else {
                            localStorage.removeItem('cotSucursal')
                        }

                        console.log('consulta ')

                        Direccion.query({
                            idUsuario: $scope.user.per_idpersona,
                            idEmpresa: $scope.empresaActual.emp_idempresa,
                            idSucursal: $scope.sucursalActual.AGENCIA,
                            idEstatus: 1,
                            opcion: 2
                        }, function(data) {

                            console.log('direcciones success!')
                            console.log(data)

                            $scope.listaDirecciones = data;

                        })

                    } //end cambio sucursales

                $scope.consultaCotizaciones = function() {

                        /*Cotizacion.query({
                            user: $scope.user.per_idpersona,
                            empresa: $scope.empresaActual.emp_idempresa, //emp_nombrecto,
                            sucursal: $scope.sucursalActual.AGENCIA //suc_nombrecto
                        },
                        function(data) {                           

                            $scope.listaCotizaciones = data

                            console.log('pinta limite credito')
                            console.log($scope.sucursalActual.Con_LimCredito)
                            
                            if ($scope.sucursalActual.Con_LimCredito) {

                                $scope.disponible = $scope.sucursalActual.Con_LimCredito - $scope.sucursalActual.descuento

                                $('.chart').data('easyPieChart').update((($scope.sucursalActual.Con_LimCredito - $scope.sucursalActual.descuento) / $scope.sucursalActual.Con_LimCredito) * 100);
                            }

                            $('#tblCotizacionFiltros').DataTable().destroy();

                            setTimeout(function() {
                                $scope.setTablePaging('tblCotizacionFiltros');

                                $("#tblCotizacionFiltros_length").removeClass("dataTables_info").addClass("hide-div");
                                $("#tblCotizacionFiltros_filter").removeClass("dataTables_info").addClass("pull-left");

                            }, 1);

                        })*/

                    } //end consultaCotizaciones

                $scope.Procesar = function(op) {

                    console.log('sdsdsdsd')

                    bootbox.confirm('laskdlaksdlaksd',
                        function(result) {
                            if (result)
                                resolve(op)
                            else
                                reject(op)
                        }
                    )

                }

                $scope.consultaSucursales = function() {

                        //$scope.sucursales = []

                        Sucursal.query({
                            user: $scope.user.per_idpersona,
                            empresa: $scope.empresaActual.emp_idempresa,                            
                            role: $scope.user.role
                        }, function(data) {
                            data.unshift({
                                AGENCIA: "0",
                                NOMBRE_AGENCIA: "Selecciona ..."
                            });
                            $scope.sucursales = data;
                            $scope.sucursalActual = $scope.sucursales[0];
                            //$scope.cambioSucursal();

                            //SET SUCURSAL DESDE LOCALSTORAGE   BEGIN
                            if (localStorage.getItem('cotSucursal') !== null) {

                                /*console.log('existe sucursal cotizacion')

                                $scope.cotSucursal = []

                                //$scope.histEmpresa = localStorage.getItem('histEmpresa')
                                $scope.tempCotSuc = localStorage.getItem('cotSucursal')
                                $scope.cotSucursal.push(JSON.parse($scope.tempCotSuc))

                                console.log($scope.cotSucursal)

                                setTimeout(function() {

                                    console.log('poniendo sucursal en cotizacion')
                                    $("#selSucursales").val($scope.cotSucursal[0][0].AGENCIA);
                                    $scope.sucursalActual = $scope.cotSucursal[0][0]; //$scope.empresas;

                                    //$scope.consultaCotizaciones();
                                    $scope.cambioSucursal();

                                }, 10);*/

                            } //SET SUCURSAL DESDE LOCALSTORAGE  END
                        })


                    } //end consulta sucursales

            })
        }
    }

    angular.module('refacciones')
        .component('aprobacion', {
            templateUrl: 'app/user/aprobacion/aprobacion.html',
            controller: AprobacionComponent
        });

})();

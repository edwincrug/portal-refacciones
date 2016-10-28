'use strict';

(function() {

    class CotizacionComponent {
        constructor($scope, User, Empresa, Sucursal, Cotizacion) {
            $('.chart').easyPieChart({
                barColor: "#8bc34a",
                "lineWidth": 8,
                "size": 115
            });
            User.get(function(data) {
                $scope.sucursalActual = $scope.empresaActual = null;
                $scope.user = data;
                $scope.listaCotizaciones = [];
                Empresa.query({
                    user: $scope.user.per_idpersona
                }, function(data) {
                    data.unshift({
                        emp_idempresa: 0,
                        emp_nombre: "Selecciona ...",
                        emp_nombrecto: ""
                    })
                    $scope.empresas = data;
                    $scope.empresaActual = $scope.empresas[0];
                })

                $scope.cambioEmpresa = function() {
                    if ($scope.empresaActual.emp_idempresa != 0) {
                        Sucursal.query({
                            user: $scope.user.per_idpersona,
                            empresa: $scope.empresaActual.emp_idempresa
                        }, function(data) {
                            data.unshift({
                                AGENCIA: "0",
                                NOMBRE_AGENCIA: "Selecciona ..."
                            });
                            $scope.sucursales = data;
                            $scope.sucursalActual = $scope.sucursales[0];
                            $scope.cambioSucursal();
                        })
                    } else {
                        $scope.sucursales = $scope.sucursalActual = null;
                    }
                }

                $scope.borrarCotizacion = function(c) {
                    bootbox.confirm("<h4>Deseas borrar permanentemente la cotizacion " + c.folio + "?</h4>", function(result) {
                        if (result) {
                            c.$delete({
                                id: c.idCotizacion
                            }, function(data) {
                                console.log(data)
                                if (data.estatus == "ok") {
                                    $scope.listaCotizaciones.forEach(function(d, n) {
                                        if (d.idCotizacion == c.idCotizacion) {
                                            $scope.listaCotizaciones.splice(n, 1);
                                        }
                                    })
                                    toastr.info(data.mensaje)
                                }
                            })
                        }
                    });
                }

                $scope.cambioSucursal = function() {
                    Cotizacion.query({
                            user: $scope.user.per_idpersona,
                            empresa: $scope.empresaActual.emp_idempresa, //emp_nombrecto,
                            sucursal: $scope.sucursalActual.AGENCIA //suc_nombrecto
                        },
                        function(data) {
                            $scope.listaCotizaciones = data
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

                        })
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
                };

            })
        }
    }


    angular.module('refacciones')
        .component('cotizacion', {
            templateUrl: 'app/user/cotizacion/cotizacion.html',
            controller: CotizacionComponent
        });

})();

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
                var fechafin=f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
                //Consigue 30 dias antes de la fecha actual
                var fI=new Date();
                fI.setDate(fI.getDate() - 30);
                var fechaInicio=fI.getDate() + "/" + (fI.getMonth() + 1) + "/" + fI.getFullYear();
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
                })
            });

            //LQMA ADD 17102016 filtro Fecha
            $scope.filtroFecha = function() {


            }

            $scope.cambioEmpresa = function() {
                if ($scope.empresaActual.emp_idempresa != 0) {
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
                    })
                } else {
                    $scope.sucursales = $scope.sucursalActual = null;
                }
            }

            $scope.cambioSucursal = function(empresa, sucursal,fecha) {

               var fechaIF=fecha.split('-');

               /* LQMA ADD 17102016 */

               var modifechaInic = fechaIF[0].split('/')//'07/10/2016'.split('/');//nuevocontrato.fechaInicio.split('/');
               var newDateIni = modifechaInic[1] + '/' + modifechaInic[0] + '/' + modifechaInic[2];
               var modifechaTerm = fechaIF[1].split('/')//'10/10/2016'.split('/');//nuevocontrato.fechaTermino.split('/');
               var newDateterm = modifechaTerm[1] + '/' + modifechaTerm[0] + '/' + modifechaTerm[2];
               //nuevocontrato.fechaInicio = newDateIni;
               //nuevocontrato.fechaTermino = newDateterm;

                Pedido.query({
                        user: $scope.user.per_idpersona,
                        estatus: 1,
                        empresa: empresa.emp_idempresa,
                        sucursal: sucursal.AGENCIA,
                        fechaI: newDateIni, //ADD LQMA 17102016
                        fechaF: newDateterm//ADD LQMA 17102016
                    },
                    function(data) {
                        $scope.listaPedidos = data
                            //console.log(data)            
                    })


            }

        }
    }

    angular.module('refacciones')
        .component('pedido', {
            templateUrl: 'app/user/pedido/pedido.html',
            controller: PedidoComponent
        });

})();

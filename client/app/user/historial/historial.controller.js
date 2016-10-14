'use strict';

(function() {

  class HistorialComponent {
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

            //LQMA ADD 05102016 obtiene detalle pedido
            $scope.muestraDetallePedido = function(idPedido) {


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
                Pedido.query({
                        user: $scope.user.per_idpersona,
                        estatus: 2,
                        empresa: empresa.emp_idempresa,
                        sucursal: sucursal.AGENCIA
                        //,
                        //fechaI: '14/09/2016',
                        //fechaF: '14/10/2016'
                    },
                    function(data) {
                        $scope.listaPedidos = data
                            //console.log(data)            
                    })


            }

    }
  }

  angular.module('refacciones')
    .component('historial', {
      templateUrl: 'app/user/historial/historial.html',
      controller: HistorialComponent
    });

})();

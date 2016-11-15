'use strict';

(function() {

    class DireccionComponent {
        constructor($scope, User, Empresa, Sucursal, Pedido, Estado, Ciudad, Municipio, Colonia, Cp,Direccion) {
            
            
            $scope.histEmpresa = {};            

            if (localStorage.getItem('histEmpresa') !== null) {

                
            } else {
                console.log('no hay nada en localstorage')
                $scope.histEmpresa = {};
            }

            $scope.sucursalActual = $scope.empresaActual = null;
            $scope.listaPedidos = [];
            User.get(function(data) {
                $scope.user = data;
                
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

                    /*$scope.Estados = [{'idEdo':0,'descripcion':'---Seleccione---'},
                                 {'idEdo':1,'descripcion':'Aguascalientes'},
                                 {'idEdo':2,'descripcion':'CDMX'},
                                 {'idEdo':3,'descripcion':'Chiapas'},
                                 {'idEdo':5,'descripcion':'Durango'},
                                 {'idEdo':6,'descripcion':'Oaxaca'},
                                 {'idEdo':7,'descripcion':'Sinaloa'},
                                 {'idEdo':8,'descripcion':'Zacatecas'}
                                ]

                    $scope.estadoActual = $scope.Estados[0];

                    $scope.Municipios = [{'idMun':0,'descripcion':'---Seleccione---'},
                                 {'idMun':1,'descripcion':'Municpio X'},
                                 {'idMun':2,'descripcion':'Municipio 9999'},
                                 {'idMun':3,'descripcion':'Municipios todos'}
                                ]

                    $scope.municipioActual = $scope.Municipios[0];

                    $scope.Ciudades = [{'idCid':0,'descripcion':'---Seleccione---'},
                                 {'idCid':1,'descripcion':'Ciudad X'},
                                 {'idCid':2,'descripcion':'Ciudad AAAAA'},
                                 {'idCid':3,'descripcion':'Ciudad de la esperanza'}
                                ]

                    $scope.ciudadActual = $scope.Ciudades[0];*/


                    //SET EMPRESA LOCALSTORAGE   BEGIN
                    if (localStorage.getItem('histEmpresa') !== null) {

                        /*$scope.histEmpresa = []
                        
                        $scope.tempHistEmp = localStorage.getItem('histEmpresa')
                        $scope.histEmpresa.push(JSON.parse($scope.tempHistEmp))

                        console.log('$scope.histEmpresa')
                        console.log($scope.histEmpresa[0][0])

                        setTimeout(function() {

                            $("#selEmpresas").val($scope.histEmpresa[0][0].emp_idempresa);
                            $scope.empresaActual = $scope.histEmpresa[0][0]; //$scope.empresas;

                            $scope.consultaSucursales();
                        }, 100);*/

                    } //SET EMPRESA LOCALSTORAGE  END

                })


            });

            $scope.cambioEmpresa = function() {
                if ($scope.empresaActual.emp_idempresa != 0) {
                
                    //$scope.histEmpresa = []
                    console.log('empresa actual')
                    console.log($scope.empresaActual)                        

                    /*$scope.histEmpresa.push({
                            emp_idempresa: $scope.empresaActual.emp_idempresa,
                            emp_nombre: $scope.empresaActual.emp_nombre,
                            emp_nombrecto: $scope.empresaActual.emp_nombrecto
                        })*/
                        
                    //localStorage.setItem('histEmpresa', JSON.stringify($scope.histEmpresa));
                
                    $scope.consultaSucursales();

                } else {
                    //$scope.sucursales = $scope.sucursalActual = null;
                    //localStorage.removeItem('histEmpresa')
                    //localStorage.removeItem('histSucursal')
                }
            }

            $scope.cambioSucursal = function(empresa, sucursal, fecha) {

                $scope.consultaEstado();

                /*$scope.consultaPedidos(empresa, sucursal, fecha);

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
                }*/

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
                            
                        }, 100);

                    } //SET SUCURSAL DESDE LOCALSTORAGE   END

                })
            }        

            $scope.cambioEstado = function() {
                
                $scope.consultaCiudad();
                
            }

            $scope.consultaEstado = function(){

                Estado.query({
                    user: $scope.user.per_idpersona,
                    idEmpresa: $scope.empresaActual.emp_idempresa,
                    idSucursal: $scope.sucursalActual.AGENCIA

                }, function(data) {                    

                    data.unshift({
                        idEdo: "0",
                        descripcion: "Seleccioné ..."
                    });                    
                    
                    $scope.Estados = data;
                    $scope.estadoActual = $scope.Estados[0];
                })
            }    

            $scope.cambioCiudad = function() {
                 
                 $scope.consultaMunicipio();
                
            }

            $scope.consultaCiudad = function(){

                Ciudad.query({
                    user: $scope.user.per_idpersona,
                    idEmpresa: $scope.empresaActual.emp_idempresa,
                    idSucursal: $scope.sucursalActual.AGENCIA,
                    estado: $scope.estadoActual.descripcion

                }, function(data) {                    

                    data.unshift({                        
                        d_ciudad: "Seleccioné ..."
                    });                    
                    
                    $scope.Ciudades = data;
                    $scope.ciudadActual = $scope.Ciudades[0];
                })
            }

            $scope.cambioMunicipio = function() {
                 
                 $scope.consultaColonia();
                
            }

            $scope.consultaMunicipio = function(){

                Municipio.query({
                    user: $scope.user.per_idpersona,
                    idEmpresa: $scope.empresaActual.emp_idempresa,
                    idSucursal: $scope.sucursalActual.AGENCIA,
                    estado: $scope.estadoActual.descripcion,
                    ciudad: $scope.ciudadActual.d_ciudad

                }, function(data) {                    

                    data.unshift({                        
                        municipio: "Seleccioné ..."
                    });                    
                    
                    $scope.Municipios = data;
                    $scope.municipioActual = $scope.Municipios[0];
                })
            }

            $scope.cambioColonia = function() {
                 
                 $scope.consultaCp();
                
            }

            $scope.consultaColonia = function(){

                Colonia.query({
                    user: $scope.user.per_idpersona,
                    idEmpresa: $scope.empresaActual.emp_idempresa,
                    idSucursal: $scope.sucursalActual.AGENCIA,
                    estado: $scope.estadoActual.descripcion,
                    ciudad: $scope.ciudadActual.d_ciudad,
                    municipio: $scope.municipioActual.municipio

                }, function(data) {                    

                    data.unshift({                        
                        colonia: "Seleccioné ..."
                    });                    
                    
                    $scope.Colonias = data;
                    $scope.coloniaActual = $scope.Colonias[0];
                })
            }            

            $scope.cambioCp = function(){


            }

            $scope.consultaCp = function(){

                Cp.query({
                    user: $scope.user.per_idpersona,
                    idEmpresa: $scope.empresaActual.emp_idempresa,
                    idSucursal: $scope.sucursalActual.AGENCIA,
                    estado: $scope.estadoActual.descripcion,
                    ciudad: $scope.ciudadActual.d_ciudad,
                    municipio: $scope.municipioActual.municipio,
                    colonia: $scope.coloniaActual.colonia

                }, function(data) {                    

                    data.unshift({                        
                        cp: "Seleccioné ..."
                    });                    
                    
                    $scope.Codigos = data;
                    $scope.cpActual = $scope.Codigos[0];
                })
            }

            $scope.guardaDireccion = function(){

                //console.log('guarda direcciones')

                Direccion.save({

                                 idUsuario: $scope.user.per_idpersona,
                                 idEmpresa: $scope.empresaActual.emp_idempresa,
                                 idSucursal: $scope.sucursalActual.AGENCIA,
                                 estado: $scope.estadoActual.idEdo,
                                 ciudad: $scope.ciudadActual.d_ciudad,
                                 municipio: $scope.municipioActual.municipio,
                                 colonia: $scope.coloniaActual.colonia,
                                 cp: $scope.cpActual.cp,

                                 calle: $scope.calle,
                                 exterior: $scope.exterior,
                                 interior: $scope.interior,
                                 referencia: $scope.referencia,

                                 nombre1: $scope.nombre1,
                                 apaterno1: $scope.apaterno1,
                                 amaterno1: $scope.amaterno1,
                                 rfc1: $scope.rfc1,
                                 lada1: $scope.lada1,
                                 tel1_1: $scope.tel1_1,
                                 tel2_1: $scope.tel2_1,
                                 correo1: $scope.correo1,
                                 
                                 nombre2: $scope.nombre2,
                                 apaterno2: $scope.apaterno2,
                                 amaterno2: $scope.amaterno2,
                                 rfc2: $scope.rfc2,
                                 lada2: $scope.lada2,
                                 tel1_2: $scope.tel1_2,
                                 tel2_2: $scope.tel2_2,
                                 correo2: $scope.correo2,
                                 correoGeneral: $scope.correoGeneral

                            }, function(data) {
                                if (data) {

                                    if (data.estatus == "ok") {

                                        console.log(data)

                                        bootbox.alert("<h4>" + data.mensaje + "</h4>",
                                            function() {
                                                $state.go("user.direccion")
                                            });

                                    }// fin if(data)
                                    else if (data.estatus == "ko") {


                                    }
                                }
                            }) //fin Direccion.save

            }


        }//fin constructor
    }

    angular.module('refacciones')
        .component('direccion', {
            templateUrl: 'app/user/direccion/direccion.html',
            controller: DireccionComponent
        });

})();
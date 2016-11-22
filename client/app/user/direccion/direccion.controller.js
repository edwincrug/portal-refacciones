'use strict';

(function() {

    class DireccionComponent {
        constructor($scope, User, Empresa, Sucursal, Pedido, Estado, Ciudad, Municipio, Colonia, Cp, Direccion, Geocoding) {


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


                        //SET EMPRESA LOCALSTORAGE   BEGIN
                        if (localStorage.getItem('histEmpresa') !== null) {



                        } //SET EMPRESA LOCALSTORAGE  END

                    })


                });

                $scope.cambioEmpresa = function() {
                    if ($scope.empresaActual.emp_idempresa != 0) {

                        //$scope.histEmpresa = []
                        console.log('empresa actual')
                        console.log($scope.empresaActual)


                        $scope.consultaSucursales();

                    } else {

                    }
                }

                $scope.cambioSucursal = function(empresa, sucursal, fecha) {

                    $scope.consultaEstado();

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

                $scope.consultaEstado = function() {

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

                $scope.consultaCiudad = function() {

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

                $scope.consultaMunicipio = function() {

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

                $scope.consultaColonia = function() {

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

                $scope.cambioCp = function() {


                }

                $scope.consultaCp = function() {

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

                $scope.guardaDireccion = function() {

                        new Promise(function(resolve, reject) {

                                $scope.cadenaConfirma = "<h4>Está a punto de registrar esta dirección ¿Desea continuar?</h4>"

                                bootbox.confirm($scope.cadenaConfirma,
                                    function(result) {
                                        if (result)
                                            resolve(1)
                                        else
                                            reject(2)
                                    }
                                )
                            }).then(function(operacion) {

                                new Promise(function(resolve, reject) {

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

                                                console.log(data)

                                                /*if (data.estatus == "ok") {

                                                    console.log(data)

                                                    bootbox.alert("<h4>" + data.mensaje + "</h4>",
                                                        function() {
                                                            $state.go("user.direccion")
                                                        });

                                                } // fin if(data)
                                                else if (data.estatus == "ko") {


                                                }*/
                                                resolve(data)
                                            }

                                        }) // fin Direccion.Save

                                }).then(function(respuesta) {

                                    bootbox.alert("<h4>Aprobación exitosa! " + respuesta.mensaje + " </h4>",
                                        function() {
                                            $('.modal-aprobacion').modal('hide')
                                                //$state.go("user.aprobacion")
                                        });

                                })

                            }) //fin promise                    

                    } // fin guarda direccion


                $scope.guardarArchivo = function(filesss) {
                    console.log('hola archivo', $scope.file)

                }

                $scope.fileNameChanged = function(ele) {

                        console.log(ele)

                        var files = ele.files;
                        var l = files.length;
                        var namesArr = [];

                        for (var i = 0; i < l; i++) {
                            namesArr.push(files[i].name);
                        }

                        console.log(files[0])

                    } //fin fileNameChanged

                    

                $scope.elegirDireccion = function(direccion) {
                    $scope.spinner2 = true;
                    $scope.$parent.$parent.direccionActual = direccion;
                    var dir = direccion.RTD_CALLE1 + " " + direccion.RTD_NUMEXTER + " " + direccion.RTD_COLONIA + " " + direccion.RTD_DELEGAC + " " + direccion.RTD_CIUDAD + " " + direccion.RTD_CODPOS;
                    $scope.mapaActual = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFoh96sELDelI27Pfwk5mGLsqFYt99AZM&q=" + dir
                        //$scope.mapaActual = "https://www.google.com/maps/embed/v1/view?key=AIzaSyBFoh96sELDelI27Pfwk5mGLsqFYt99AZM&q=" + dir
                }


            } //fin constructor
    }

    angular.module('refacciones')
        .component('direccion', {
            templateUrl: 'app/user/direccion/direccion.html',
            controller: DireccionComponent
        });

})();

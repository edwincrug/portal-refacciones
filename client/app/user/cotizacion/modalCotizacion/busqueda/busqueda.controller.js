'use strict';

(function() {

  class BusquedaComponent {

    initial($scope, Cotizacion, Template) {

      $scope.busquedaActual = [];
      $scope.cotizacionActual = [];
      $scope.listaTemplates = [];

      $scope.$parent.$parent.guardarModal = false
      $scope.guardar = false;
      $scope.templateActual = null;
      $scope.templateTemp = null;
    }



    calcularTotal(cotizaciones) {
      var total = 0;
      cotizaciones.forEach(function(data) {
        total += data.PTS_PCOLISTA * data.cantidad;
      })
      return total
    }

    constructor($scope, $location, $state, $stateParams, User, Refaccion, Cotizacion, Template) {
      //Variables iniciales
      var self = this;
      $scope.empresaActual = $scope.$parent.$parent.$parent.empresaActual;
      $scope.sucursalActual = $scope.$parent.$parent.$parent.sucursalActual;
      $scope.folioActual = $scope.$parent.$parent.folioActual;
      $scope.spinner = true;


      User.get(function(data) {
        $scope.user = data;
        //Carga los templates asociados
        Template.query({
          user: $scope.user.per_idpersona,
          empresa: $scope.empresaActual.emp_nombrecto,
          sucursal: $scope.sucursalActual.suc_nombrecto
        }, function(data) {
          data.unshift({
            idCotizacionPlantilla: 0,
            descripcion: "Selecciona ..."
          });
          $scope.listaTemplates = data;
          if (!$stateParams.template) {
            $scope.templateTemp = $scope.templateActual = $scope.listaTemplates[0];
          } else {
            $scope.listaTemplates.forEach(function(d, n) {
              if (d.idCotizacionPlantilla == $stateParams.template) {
                $scope.templateTemp = $scope.templateActual = $scope.listaTemplates[n]
              }
            })
          }

          $('[data-toggle="tooltip"]').tooltip()
        })

        //Carga refacciones si es edicion de cotizacion
        if ($scope.$parent.$parent.cotizacionActual.length > 0) {
          setTimeout(function() {
            $scope.cotizacionActual = $scope.$parent.$parent.cotizacionActual
            $scope.spinner = false;
          }, 1)
        } else {
          if ($scope.folioActual != "TEMP") {
            Cotizacion.get({
              id: $scope.folioActual
            }, function(data) {
              $scope.$parent.$parent.cotizacionActual = $scope.cotizacionActual = data.data;
              setTimeout(function() {
                $scope.$parent.$parent.guardarModal = false
                $scope.guardar = false;
                $scope.spinner = false;
                $scope.$apply()

              }, 10)

            })
          }else{
              $scope.spinner = false;
          }
        }


        self.initial($scope);
        $scope.busquedaActual = []

        //Limpia busqueda de refacciones
        $scope.clearQuery = function() {
          $scope.refaccionBusqueda = ""
          $scope.busquedaActual = []

        }

        //Monitorea cambios en la lista de refacciones actual
        $scope.$watch('cotizacionActual', function(a, b) {
          $scope.$parent.$parent.total = $scope.total = self.calcularTotal($scope.cotizacionActual)
          if ($scope.cotizacionActual.length > 0) {
            $scope.$parent.$parent.guardarModal = true
            $scope.guardar = true;
          } else {
            $scope.$parent.$parent.guardarModal = false
            $scope.guardar = false;
          }
        }, true);

        //Agrega una refaccion a la cotizacion actual
        $scope.agregarACotizacion = function(refaccion) {
          var e = true;
          $scope.cotizacionActual.forEach(function(d, n) {
            if (d.PTS_IDPARTE == refaccion.PTS_IDPARTE) {
              $scope.cotizacionActual[n].cantidad += refaccion.cantidad
              e = false;
            }
          })
          if (e) {
            $scope.cotizacionActual.push(refaccion)
            $scope.$parent.$parent.cotizacionActual = $scope.cotizacionActual;
          }
          $scope.refaccionBusqueda = ""
          $scope.busquedaActual = []
        }

        //Guarda la cotizacion actual si es nueva, si es edicion guarda los cambios
        $scope.guadarCotizacionBack = function() {
          if ($scope.folioActual == "TEMP") {
            bootbox.prompt({
              title: "Introduce una descripcion a la cotizacion",
              callback: function(result) {
                if (result != null && result != "") {
                  var cotizacionGuardar = {
                    idUsuario: $scope.user.per_idpersona,
                    refacciones: $scope.cotizacionActual,
                    descripcion: result,
                    total: $scope.total,
                    empresa: $scope.empresaActual.emp_nombrecto,
                    sucursal: $scope.sucursalActual.suc_nombrecto,
                    base: "GAZM_Zaragoza"
                  }
                  Cotizacion.save(cotizacionGuardar, function(data) {
                    var params = {
                      id: data.idCotizacion,
                    }
                    if ($scope.templateActual != null) {
                      params.template = $scope.templateActual.idCotizacionPlantilla
                    }
                    $state.go("user.cotizacion.modal.busqueda", params)
                    $scope.$parent.$parent.$parent.cambioSucursal()
                    toastr.success(data.mensaje)

                    $scope.$parent.$parent.guardarModal = false
                    $scope.guardar = false;

                  })
                }
              }
            })
          } else {
            var cotizacionGuardar = {
              idCotizacion: $scope.folioActual,
              refacciones: $scope.cotizacionActual,
              total: $scope.total,
            }
            Cotizacion.update(cotizacionGuardar, function(data) {
              $scope.$parent.$parent.$parent.cambioSucursal()
              toastr.success(data.mensaje)
              $scope.$parent.$parent.guardarModal = false
              $scope.guardar = false;
            })
          }
        }

        // Guarda del template si es nuevo, si es edicion guarda los cambios
        $scope.guadarTemplateBack = function() {
          if ($scope.templateActual.idCotizacionPlantilla == 0) {
            bootbox.prompt({
              title: "Introduce un nombre para la nueva plantilla.",
              callback: function(result) {
                if (result != null && result != "") {
                  var cotizacionGuardar = {
                    idUsuario: 11,
                    idCotizacion: $scope.folioActual,
                    refacciones: $scope.cotizacionActual,
                    descripcion: result,
                    empresa: $scope.empresaActual.emp_nombrecto,
                    sucursal: $scope.sucursalActual.suc_nombrecto,
                    base: "GAZM_Zaragoza"
                  }
                  Template.save(cotizacionGuardar, function(data) {
                    console.log(data)
                    toastr.success(data.mensaje)
                    $scope.listaTemplates.push({
                      idCotizacionPlantilla: data.idPlantilla,
                      descripcion: result
                    })
                    $scope.templateActual = $scope.listaTemplates[$scope.listaTemplates.length - 1]
                  })
                }
              }
            })
          } else {
            var cotizacionGuardar = {
              idCotizacionPlantilla: $scope.templateActual.idCotizacionPlantilla,
              refacciones: $scope.cotizacionActual,
            }
            Template.update(cotizacionGuardar, function(data) {
              toastr.success(data.mensaje)
            })
          }
        }

        //Elimina refaccion de la cotizacion actual
        $scope.borrarCotizacion = function(refaccion) {
          $scope.cotizacionActual.forEach(function(d, n) {
            if (d.PTS_IDPARTE == refaccion.PTS_IDPARTE) {
              $scope.cotizacionActual.splice(n, 1);
              $scope.$parent.$parent.cotizacionActual = $scope.cotizacionActual
            }
          })
        }

        //Busca listado de refacciones que  coincidan con el termino de busqueda
        $scope.buscarRefaccion = function() {
          if ($scope.refaccionBusqueda.length > 2) {
            Refaccion.query({
              query: $scope.refaccionBusqueda,
              par_idenpara: 'GEN',
              par_tipopara: 'SA',
              idEmpresa: $scope.empresaActual.emp_idempresa,
              idSucursal: $scope.sucursalActual.AGENCIA

            }, function(data) {
              data.forEach(function(d) {
                d.cantidad = 1;
              })
              $scope.busquedaActual = data;
            })
          } else {
            $scope.busquedaActual = []
          }
        }

        //Carga las refacciones desde un template
        $scope.cargarTemplate = function() {
          if ($scope.cotizacionActual.length > 0) {
            bootbox.confirm("<h4>Al cargar una plantilla, se perderan los cambios no guardados de la cotizacion actua. ¿Desea continuar?</h4>",
              function(result) {
                if (result) {
                  $scope.templateTemp = $scope.templateActual
                  Template.get({
                    id: $scope.templateActual.idCotizacionPlantilla
                  }, function(data) {
                    $scope.cotizacionActual = data.data;
                    $scope.$parent.$parent.cotizacionActual = $scope.cotizacionActual
                    toastr.info("Se cargo la plantilla correctamente.")
                  })
                } else {
                  $scope.listaTemplates.forEach(function(e, n) {
                    if ($scope.templateTemp.idCotizacionPlantilla == e.idCotizacionPlantilla) {
                      $scope.templateActual = $scope.listaTemplates[n];
                      $scope.$apply($scope.templateActual)
                    }
                  })
                }
              })
          } else {
            $scope.templateTemp = $scope.templateActual
            Template.get({
              id: $scope.templateActual.idCotizacionPlantilla
            }, function(data) {
              $scope.cotizacionActual = data.data;
              $scope.$parent.$parent.cotizacionActual = $scope.cotizacionActual
              toastr.info("Se cargo la plantilla correctamente.")
            })
          }
        }

        //Eliminar plantilla
        $scope.eliminarTemplate = function() {
          bootbox.confirm("<h4>El borrado de la plantilla no afecta su cotizacion actual. ¿Desea continuar con el borrado?</h4>",
            function(result) {
              if (result) {
                Template.remove({
                  id: $scope.templateActual.idCotizacionPlantilla
                }, function(data) {
                  $scope.listaTemplates.forEach(function(e, n) {
                    if ($scope.templateActual.idCotizacionPlantilla == e.idCotizacionPlantilla) {
                      $scope.listaTemplates.splice(n, 1);
                      $scope.templateActual = $scope.listaTemplates[0];
                      toastr.info("Se elimino la plantilla correctamente.")
                    }
                  })
                  console.log(data.mensaje)
                })
              }
            })
        }
      })
    }
  }

  angular.module('refacciones')
    .component('busqueda', {
      templateUrl: 'app/user/cotizacion/modalCotizacion/busqueda/busqueda.html',
      controller: BusquedaComponent,
      controllerAs: 'busquedaCtrl'
    });

})();

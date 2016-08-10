'use strict';

class ModalCotizacionComponent {
  constructor($state,$scope) {
    $scope.total = 0;
    if($scope.empresaActual == null || $scope.sucursalActual == null){
      $state.go("user.cotizacion")
    }else{
      $('.modal-cotizacion').modal('show')
      $('.modal-cotizacion').on('shown.bs.modal', function(e) {
        var moveIt = $(".modal-backdrop").remove();
        $("#modal-cotizacion-container").append(moveIt);
        $("#navbar").css("position", "static");
        $("#footer").css("position", "static");
      })
      $('.modal-cotizacion').on('hidden.bs.modal', function(e) {
        $("#navbar").css("position", "absolute");
        $("#footer").css("position", "absolute");
        $state.go("user.cotizacion")
      })

    }

    $('#demo-step-wz').bootstrapWizard({
      tabClass: 'wz-steps',
      nextSelector: '.next',
      previousSelector: '.previous',
      onTabClick: function(tab, navigation, index) {
        return false;
      },
      onInit: function() {
        $('#demo-step-wz').find('.finish').hide().prop('disabled', true);
      },
      onTabShow: function(tab, navigation, index) {
        var $total = navigation.find('li').length;
        var $current = index + 1;
        var $percent = (index / $total) * 100;
        var wdt = 100 / $total;
        var lft = wdt * index;
        var margin = (100 / $total) / 2;
        $('#demo-step-wz').find('.progress-bar').css({
          width: $percent + '%',
          'margin': 0 + 'px ' + margin + '%'
        });


        // If it's the last tab then hide the last button and show the finish instead
        if ($current >= $total) {
          $('#demo-step-wz').find('.next').hide();
          $('#demo-step-wz').find('.finish').show();
          $('#demo-step-wz').find('.finish').prop('disabled', false);
        } else {
          $('#demo-step-wz').find('.next').show();
          $('#demo-step-wz').find('.finish').hide().prop('disabled', true);
        }
      }
    });

  }
}

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider
      .state('user.cotizacion.modal', {
        url: '/:id',
        templateUrl: 'app/user/cotizacion/modalCotizacion/modalCotizacion.html',
        controller: ModalCotizacionComponent,
        //abstract: true
      });
  });

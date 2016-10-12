'use strict';

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider.state('user', {
      url: '/',

      templateUrl: 'app/user/user.html',
      authenticate: true,
      controller:function($scope,$state,User,Auth){
        User.get(function(data){
          $scope.user = data;
          $scope.classMenu = "mainnav-sm"
          $scope.toggeMenu = function(){
              if($scope.classMenu == "mainnav-sm"){
                $scope.classMenu = "mainnav-in";
              }else {
                $scope.classMenu = "mainnav-sm";
              }
          }

        })

       $scope.cerrarSession = function()
       {
          Auth.logout();
          $state.go('login');
          
       } 


      }
    });
  });

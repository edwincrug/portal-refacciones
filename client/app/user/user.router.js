'use strict';

angular.module('refacciones')
  .config(function($stateProvider) {
    $stateProvider.state('user', {
      url: '/',

      templateUrl: 'app/user/user.html',
      authenticate: true,
      controller:function($scope,User){
        User.get(function(data){
          $scope.user = data;
          $scope.classMenu = "mainnav-out"
          $scope.toggeMenu = function(){
              if($scope.classMenu == "mainnav-out"){
                $scope.classMenu = "mainnav-in";
              }else {
                $scope.classMenu = "mainnav-out";
              }
          }

        })

      }
    });
  });

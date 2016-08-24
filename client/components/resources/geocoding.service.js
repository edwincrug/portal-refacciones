

'use strict';

function geocodingService($http) {
  return {
    toLatLng : function(dir){
      console.log(dir)
      return $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+dir+"&key=AIzaSyBNoVwlP2bV9DIOqRcZc2VPVR_A6psQKLY")
    }
  }
}

angular.module('refacciones')
  .service('Geocoding', geocodingService);

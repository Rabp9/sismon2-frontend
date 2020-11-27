'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:InterseccionesViewCtrl
 * @description
 * # InterseccionesViewCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('InterseccionesViewCtrl', function ($scope, $uibModalInstance, 
    interseccion, NgMap) {

    $scope.init = function() {
        $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY';

        NgMap.getMap().then(function(map) {
            google.maps.event.trigger(map, 'resize'); 
        });
    
        $scope.interseccion = angular.copy(interseccion);
    };
    
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.init();
});
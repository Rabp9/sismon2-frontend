'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:InterseccionesAddCtrl
 * @description
 * # InterseccionesAddCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('InterseccionesAddCtrl', function ($scope, NgMap, interseccionesService,
    $state, $utilsViewService) {
    $scope.loading = false;
    
    $scope.init = function() {
        $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY';
        NgMap.getMap().then(function(map) {
            google.maps.event.trigger(map, 'resize'); 
        });
        $scope.interseccion = {};
    };
        
    $scope.setMarker = function(event) {
        var ll = event.latLng;
        $scope.interseccion.latitud = ll.lat();
        $scope.interseccion.longitud = ll.lng();
    };
    
    $scope.save = function(interseccion) {
        $utilsViewService.disable('.btn-submit');

        interseccionesService.save(interseccion, function(data) {
            $state.go('interseccionesIndex', {response: data});
        }, function (err) {
            $state.go('interseccionesIndex', {response: err});
        });

    };
    $scope.init();
});
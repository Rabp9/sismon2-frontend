'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:MapaCtrl
 * @description
 * # MapaCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('MapaCtrl', function ($scope, interseccionesService, $uibModal, NgMap) {
    $scope.init = function() {
        $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY';
        NgMap.getMap().then(function(map) {
            $scope.map = map;
        });
        $scope.getIntersecciones();
    };
    
    $scope.getIntersecciones = function() {
        $scope.intersecciones = [];
        $scope.loading = true;
        interseccionesService.getWithActividades(function(data) {
            $scope.intersecciones = data.intersecciones;
            $scope.ubicacionLat = data.intersecciones[0].latitud;
            $scope.ubicacionLng = data.intersecciones[0].longitud;     
            $scope.loading = false;
            if ($scope.intersecciones.length === 1) {
                $scope.includeMarkers = false;
            } else {
                $scope.includeMarkers = true;
            }
        });
    };
    
    $scope.showInterseccion = function(event, interseccion) {
        $scope.selectedInterseccion = interseccion;
        $scope.map.showInfoWindow('myInfoWindow', this);
    };

    $scope.init();
});
'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:ActividadesEditTareaCtrl
 * @description
 * # ActividadesEditTareaCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('ActividadesEditTareaCtrl', function ($scope, $uibModalInstance, tarea, NgMap, $utilsViewService, interseccionesService) {
    
    $scope.init = function() {
        $scope.tarea = angular.copy(tarea);
        $scope.tarea.pre_fecha_programada = $utilsViewService.formatDateToJs($scope.tarea.fecha_programada);
        
        $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY';

        NgMap.getMap().then(function(map) {
            google.maps.event.trigger(map, 'resize'); 
        });
        
        if ($scope.tarea.interseccion !== null) {
            $scope.lttCenter = $scope.tarea.interseccion.latitud;
            $scope.lgtCenter = $scope.tarea.interseccion.longitud;

            $scope.getIntersecciones();
        }
    };

    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.setMarker = function(event) {
        var ll = event.latLng;
        $scope.tarea.interseccion.latitud = ll.lat();
        $scope.tarea.interseccion.longitud = ll.lng();
    };
    
    $scope.save = function(tarea) {
        tarea.fecha_programada = $utilsViewService.formatDateToSql(tarea.pre_fecha_programada);
        $utilsViewService.disable('.btn-button');
        $uibModalInstance.close(tarea);
    };
    
    $scope.getIntersecciones = function() {
        $scope.loadingIntersecciones = true;
        interseccionesService.getEnabled(function(data) {
            $scope.intersecciones = data.intersecciones;
            $scope.loadingIntersecciones = false;
        });
    };
    
    $scope.setInterseccion = function(event, interseccion) {
        $scope.tarea.interseccion = interseccion;
        $scope.tarea.interseccion_id = interseccion.id;
    };
    
    $scope.init();
});
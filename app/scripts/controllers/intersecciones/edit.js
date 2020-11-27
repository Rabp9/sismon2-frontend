'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:InterseccionesEditCtrl
 * @description
 * # InterseccionesEditCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('InterseccionesEditCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, interseccionesService, interseccion, NgMap) {

    $scope.init = function() {
        $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY';

        NgMap.getMap().then(function(map) {
            google.maps.event.trigger(map, 'resize'); 
        });
    
        $scope.interseccion = angular.copy(interseccion);
        $scope.lttCenter = $scope.interseccion.latitud;
        $scope.lgtCenter = $scope.interseccion.longitud;
    };
    
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function(interseccion) {
        $utilsViewService.disable('.btn-submit');
        
        interseccionesService.update(interseccion, function (data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.setMarker = function(event) {
        var ll = event.latLng;
        $scope.interseccion.latitud = ll.lat();
        $scope.interseccion.longitud = ll.lng();
    };
    
    $scope.init();
});
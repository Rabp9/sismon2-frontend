'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:InterseccionesIndexCtrl
 * @description
 * # InterseccionesIndexCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('InterseccionesIndexCtrl', function ($scope, interseccionesService, $uibModal, NgMap, $stateParams) {
    $scope.init = function() {
        if ($stateParams.response !== null) {
            $scope.message = $stateParams.response.message;
        }
        $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY';
        $scope.display = 'lista';
        NgMap.getMap().then(function(map) {
            $scope.map = map;
        });

        $scope.table = {
            loading: true,
            count: 0,
            page: 1,
            search: {
                text: "",
                estado_id: 1
            },
            pagination: {
                itemsPerPage: 10,
                totalItems: 0
            },
            interseccionesWs: {
                wId: '9%',
                wDescripcion: '58%',
                wCodigo: '13%',
                wAcciones: '20%'
            },
            onChangeItemsPerPage: function() {
                $scope.table.page = 1;
                $scope.getIntersecciones();
            },
            pageChanged: function() {
                $scope.getIntersecciones();
            }
        };
    };
    
    $scope.getIntersecciones = function() {
        $scope.intersecciones = [];
        $scope.table.loading = true;
        interseccionesService.get({
            search: $scope.table.search.text,
            estado_id: $scope.table.search.estado_id,
            
            page: $scope.table.page,
            itemsPerPage: $scope.table.pagination.itemsPerPage
        }, function(data) {
            $scope.intersecciones = data.intersecciones;
            $scope.table.loading = false;
            $scope.table.count = data.count;
            $scope.table.pagination = data.pagination;
            
            $scope.ubicacionLat = data.intersecciones[0].latitud;
            $scope.ubicacionLng = data.intersecciones[0].longitud;     
            
            if ($scope.intersecciones.length === 1) {
                $scope.includeMarkers = false;
            } else {
                $scope.includeMarkers = true;
            }
        });
    };
    
    $scope.$watch('table.search.text', function(oldValue, newValue) {
        $scope.table.page = 1;
        $scope.getIntersecciones();
    });
    
    $scope.$watch('table.search.estado_id', function(oldValue, newValue) {
        $scope.table.page = 1;
        $scope.getIntersecciones();
    });
    
    $scope.changeDisplay = function(mode) {
        $scope.display = mode;
        if (mode === 'lista') {
            $scope.table.pagination.itemsPerPage = 10;
        } else if (mode === 'mapa') {
            $scope.table.pagination.itemsPerPage = 0;
        }
        $scope.table.page = 1;
        $scope.getIntersecciones();
    };
    
    $scope.showInterseccion = function(event, interseccion) {
        $scope.selectedInterseccion = interseccion;
        $scope.map.showInfoWindow('myInfoWindow', this);
    };

    $scope.showInterseccionesView = function(interseccion) {
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/intersecciones/view.html',
            controller: 'InterseccionesViewCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                interseccion: function() {
                    return interseccion;
                } 
            }
        });

    };
    
    $scope.showInterseccionesEdit = function(interseccion) {
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/intersecciones/edit.html',
            controller: 'InterseccionesEditCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                interseccion: function() {
                    return interseccion;
                } 
            }
        });

        modalInstanceEdit.result.then(function (data) {
            $scope.message = data.message;
            $scope.getIntersecciones();
        });
    };
    
    $scope.disable = function(interseccion) {
        if (confirm('¿Está seguro de deshabilitar esta intersección?')) {
            interseccionesService.disable({
                id: interseccion.id
            }, function(data) {
                $scope.message = data.message;
                $scope.getIntersecciones();
            });
        }
    };
    
    $scope.enable = function(interseccion) {
        if (confirm('¿Está seguro de habilitar esta intersección?')) {
            interseccionesService.enable({
                id: interseccion.id
            }, function(data) {
                $scope.message = data.message;
                $scope.getIntersecciones();
            });
        }
    };

    $scope.init();
});
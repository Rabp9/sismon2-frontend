'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:ActividadesViewCtrl
 * @description
 * # ActividadesViewCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('ActividadesViewCtrl', function ($scope, $stateParams, actividadesService, NgMap, tareasService) {
    $scope.init = function() {
        $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY';
        NgMap.getMap().then(function(map) {
            $scope.map = map;
        });

        $scope.tableTareas = {
            loading: true,
            tareasWs: {
                wId: '6%',
                wDescripcion: '33%',
                wFechaProgramada: '18%',
                wInterseccion: '33%',
                wEstado: '10%'
            }
        };
        $scope.tableTareasRealizadas = {
            loading: true,
            tareasRealizadasWs: {
                wId: '3%',
                wDescripcion: '27%',
                wFechaProgramada: '11%',
                wFechaRealizada: '11%',
                wInterseccion: '18%',
                wTrabajadoresInvolucrados: '30%'
            }
        };
        $scope.tableTareasPendientes = {
            loading: true,
            tareasPendientesWs: {
                wId: '3%',
                wDescripcion: '28%',
                wDificultad: '11%',
                wPrioridad: '11%',
                wFechaRegistro: '11%',
                wFechaProgramada: '11%',
                wInterseccion: '25%'
            }
        };
        if ($stateParams.actividad_id !== null) {
            $scope.tableTareas.loading = true;
            actividadesService.get({
                id: $stateParams.actividad_id
            }, function(data) {
                $scope.actividad = data.actividad; 
                
                if ($scope.actividad.actividades_intersecciones_detalles.length > 0) {
                    $scope.ubicacionLat = $scope.actividad.actividades_intersecciones_detalles[0].interseccion.latitud;
                    $scope.ubicacionLng = $scope.actividad.actividades_intersecciones_detalles[0].interseccion.longitud;

                    if ($scope.actividad.actividades_intersecciones_detalles.length === 1) {
                        $scope.includeMarkers = false;
                    } else {
                        $scope.includeMarkers = true;
                    }
                }
                $scope.tableTareas.loading = false;
                $scope.tableTareasRealizadas.loading = true;
                tareasService.getRealizadasByActividad({
                    actividad_id: $scope.actividad.id
                }, function(data) {
                    $scope.tareasRealizadas = data.tareas;
                    $scope.tableTareasRealizadas.loading = false;
                    
                    $scope.tableTareasPendientes.loading = true;
                    tareasService.getPendientesByActividad({
                        actividad_id: $scope.actividad.id
                    }, function(data) {
                        $scope.tareasPendientes = data.tareas;
                        $scope.tableTareasPendientes.loading = false;
                    });
                });
            });
        }
        
    };
    
    $scope.showInterseccion = function(event, interseccion) {
        $scope.selectedInterseccion = interseccion;
        $scope.map.showInfoWindow('myInfoWindow', this);
    };

    $scope.init();
});
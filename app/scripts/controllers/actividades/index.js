'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:ActividadesIndexCtrl
 * @description
 * # ActividadesIndexCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('ActividadesIndexCtrl', function ($scope, actividadesService, $uibModal, $stateParams) {
    $scope.init = function() {
        if ($stateParams.response !== null) {
            $scope.message = $stateParams.response.message;
        }
        $scope.table = {
            loading: true,
            count: 0,
            page: 1,
            todos: false,
            search: {
                text: "",
                estado_id: [1, 3]
            },
            pagination: {
                itemsPerPage: 10,
                totalItems: 0
            },
            actividadesWs: {
                wId: '6%',
                wDescripcion: '15%',
                wActividadesTipo: '12%',
                wResponsable: '15%',
                wNTareas: '9%',
                wNIntersecciones: '9%',
                wFechaRegistro: '11%',
                wPorcentaje: '12%',
                wAcciones: '11%'
            },
            onChangeItemsPerPage: function() {
                $scope.table.page = 1;
                $scope.getActividades();
            },
            pageChanged: function() {
                $scope.getActividades();
            }
        };
    };
    
    $scope.getActividades = function() {
        $scope.actividades = [];
        $scope.table.loading = true;
        actividadesService.get({
            search: $scope.table.search.text,
            estado_id: $scope.table.search.estado_id.join(','),
            
            page: $scope.table.page,
            itemsPerPage: $scope.table.pagination.itemsPerPage
        }, function(data) {
            $scope.actividades = data.actividades;
            $scope.table.loading = false;
            $scope.table.count = data.count;
            $scope.table.pagination = data.pagination;
        });
    };
    
    $scope.$watch('table.search.text', function(oldValue, newValue) {
        $scope.table.page = 1;
        $scope.getActividades();
    });
    
    $scope.$watch('table.search.estado_id', function(oldValue, newValue) {
        $scope.table.page = 1;
        $scope.getActividades();
    });
    
    $scope.disable = function(actividad) {
        if (confirm('¿Está seguro de deshabilitar esta actividad?')) {
            actividadesService.disable({
                id: actividad.id
            }, function(data) {
                $scope.message = data.message;
                $scope.getActividades();
            });
        }
    };
    
    $scope.enable = function(actividad) {
        if (confirm('¿Está seguro de habilitar esta actividad?')) {
            actividadesService.enable({
                id: actividad.id
            }, function(data) {
                $scope.message = data.message;
                $scope.getActividades();
            });
        }
    };

    $scope.checkAll = function() {
        if ($scope.todos) {
            $scope.table.search.estado_id = [1, 2, 3];
        } else {
            $scope.table.search.estado_id = [];
        }
    };
    
    $scope.init();
});
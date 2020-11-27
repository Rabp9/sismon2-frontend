'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:ActividadestiposIndexCtrl
 * @description
 * # ActividadestiposIndexCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('ActividadestiposIndexCtrl', function ($scope, actividadesTiposService, $uibModal, $stateParams) {
    $scope.init = function() {
        if ($stateParams.response !== null) {
            $scope.message = $stateParams.response.message;
        }
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
            actividadesTiposWs: {
                wId: '15%',
                wDescripcion: '65%',
                wAcciones: '20%'
            },
            onChangeItemsPerPage: function() {
                $scope.table.page = 1;
                $scope.getActividadesTipos();
            },
            pageChanged: function() {
                $scope.getActividadesTipos();
            }
        };
    };
    
    $scope.getActividadesTipos = function() {
        $scope.actividadesTipos = [];
        $scope.table.loading = true;
        actividadesTiposService.get({
            search: $scope.table.search.text,
            estado_id: $scope.table.search.estado_id,
            
            page: $scope.table.page,
            itemsPerPage: $scope.table.pagination.itemsPerPage
        }, function(data) {
            $scope.actividadesTipos = data.actividadesTipos;
            $scope.table.loading = false;
            $scope.table.count = data.count;
            $scope.table.pagination = data.pagination;
        });
    };
    
    $scope.$watch('table.search.text', function(oldValue, newValue) {
        $scope.table.page = 1;
        $scope.getActividadesTipos();
    });
    
    $scope.$watch('table.search.estado_id', function(oldValue, newValue) {
        $scope.table.page = 1;
        $scope.getActividadesTipos();
    });
    
    $scope.showActividadesTiposView = function(actividadesTipo) {
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/actividadestipos/view.html',
            controller: 'ActividadestiposViewCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                actividadesTipo: function() {
                    return actividadesTipo;
                } 
            }
        });

    };
    
    $scope.showActividadesTiposEdit = function(actividadesTipo) {
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/actividadestipos/edit.html',
            controller: 'ActividadestiposEditCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                actividadesTipo: function() {
                    return actividadesTipo;
                } 
            }
        });

        modalInstanceEdit.result.then(function (data) {
            $scope.message = data.message;
            $scope.getActividadesTipos();
        });
    };
    
    $scope.disable = function(actividadesTipo) {
        if (confirm('¿Está seguro de deshabilitar este tipo de actividad?')) {
            actividadesTiposService.disable({
                id: actividadesTipo.id
            }, function(data) {
                $scope.message = data.message;
                $scope.getActividadesTipos();
            });
        }
    };
    
    $scope.enable = function(actividadesTipo) {
        if (confirm('¿Está seguro de habilitar este tipo de actividad?')) {
            actividadesTiposService.enable({
                id: actividadesTipo.id
            }, function(data) {
                $scope.message = data.message;
                $scope.getActividadesTipos();
            });
        }
    };

    $scope.init();
});
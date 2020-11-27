'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:TrabajadoresIndexCtrl
 * @description
 * # TrabajadoresIndexCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('TrabajadoresIndexCtrl', function ($scope, trabajadoresService, $uibModal, $stateParams) {
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
            trabajadoresWs: {
                wId: '8%',
                wFullName: '50%',
                wDni: '22%',
                wAcciones: '20%'
            },
            onChangeItemsPerPage: function() {
                $scope.table.page = 1;
                $scope.getTrabajadores();
            },
            pageChanged: function() {
                $scope.getTrabajadores();
            }
        };
    };
    
    $scope.getTrabajadores = function() {
        $scope.trabajadores = [];
        $scope.table.loading = true;
        trabajadoresService.get({
            search: $scope.table.search.text,
            estado_id: $scope.table.search.estado_id,
            
            page: $scope.table.page,
            itemsPerPage: $scope.table.pagination.itemsPerPage
        }, function(data) {
            $scope.trabajadores = data.trabajadores;
            $scope.table.loading = false;
            $scope.table.count = data.count;
            $scope.table.pagination = data.pagination;
        });
    };
    
    $scope.$watch('table.search.text', function(oldValue, newValue) {
        $scope.table.page = 1;
        $scope.getTrabajadores();
    });
    
    $scope.$watch('table.search.estado_id', function(oldValue, newValue) {
        $scope.table.page = 1;
        $scope.getTrabajadores();
    });
    
    $scope.showTrabajadoresView = function(trabajador) {
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/trabajadores/view.html',
            controller: 'TrabajadoresViewCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                trabajador: function() {
                    return trabajador;
                } 
            }
        });

    };
    
    $scope.showTrabajadoresEdit = function(trabajador) {
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/trabajadores/edit.html',
            controller: 'TrabajadoresEditCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                trabajador: function() {
                    return trabajador;
                } 
            }
        });

        modalInstanceEdit.result.then(function (data) {
            $scope.message = data.message;
            $scope.getTrabajadores();
        });
    };
    
    $scope.disable = function(trabajador) {
        if (confirm('¿Está seguro de deshabilitar este trabajador?')) {
            trabajadoresService.disable({
                id: trabajador.id
            }, function(data) {
                $scope.message = data.message;
                $scope.getTrabajadores();
            });
        }
    };
    
    $scope.enable = function(trabajador) {
        if (confirm('¿Está seguro de habilitar este trabajador?')) {
            trabajadoresService.enable({
                id: trabajador.id
            }, function(data) {
                $scope.message = data.message;
                $scope.getTrabajadores();
            });
        }
    };

    $scope.init();
});
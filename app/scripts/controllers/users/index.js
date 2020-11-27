'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:UsersIndexCtrl
 * @description
 * # UsersIndexCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
  .controller('UsersIndexCtrl', function ($scope, usersService, $uibModal, $stateParams) {
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
            usersWs: {
                wId: '6%',
                wUserName: '28%',
                wTrabajador: '41%',
                wAcciones: '25%'
            },
            onChangeItemsPerPage: function() {
                $scope.table.page = 1;
                $scope.getUsers();
            },
            pageChanged: function() {
                $scope.getUsers();
            }
        };
    };
    
    $scope.getUsers = function() {
        $scope.users = [];
        $scope.table.loading = true;
        usersService.get({
            search: $scope.table.search.text,
            estado_id: $scope.table.search.estado_id,
            
            page: $scope.table.page,
            itemsPerPage: $scope.table.pagination.itemsPerPage
        }, function(data) {
            $scope.users = data.users;
            $scope.table.loading = false;
            $scope.table.count = data.count;
            $scope.table.pagination = data.pagination;
        });
    };
    
    $scope.$watch('table.search.text', function(oldValue, newValue) {
        $scope.table.page = 1;
        $scope.getUsers();
    });
    
    $scope.$watch('table.search.estado_id', function(oldValue, newValue) {
        $scope.table.page = 1;
        $scope.getUsers();
    });
    
    $scope.showUsersAsignar = function(user) {
        var modalInstanceAsignar = $uibModal.open({
            templateUrl: 'views/users/asignar.html',
            controller: 'UsersAsignarCtrl',
            backdrop: false,
            resolve: {
                user: function() {
                    return user;
                } 
            }
        });

        modalInstanceAsignar.result.then(function (data) {
            $scope.message = data.message;
            $scope.getUsers();
        });
    };
    
    $scope.showUsersView = function(user) {
        var modalInstanceView = $uibModal.open({
            templateUrl: 'views/users/view.html',
            controller: 'UsersViewCtrl',
            backdrop: false,
            resolve: {
                user: function() {
                    return user;
                } 
            }
        });

    };
    
    $scope.showUsersEdit = function(user) {
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/users/edit.html',
            controller: 'UsersEditCtrl',
            backdrop: false,
            resolve: {
                user: function() {
                    return user;
                } 
            }
        });

        modalInstanceEdit.result.then(function (data) {
            $scope.message = data.message;
            $scope.getUsers();
        });
    };
    
    $scope.disable = function(user) {
        if (confirm('¿Está seguro de deshabilitar este usuario?')) {
            usersService.disable({
                id: user.id
            }, function(data) {
                $scope.message = data.message;
                $scope.getUsers();
            });
        }
    };
    
    $scope.enable = function(user) {
        if (confirm('¿Está seguro de habilitar este usuario?')) {
            usersService.enable({
                id: user.id
            }, function(data) {
                $scope.message = data.message;
                $scope.getUsers();
            });
        }
    };

    $scope.init();
});
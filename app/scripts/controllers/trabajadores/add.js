'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:TrabajadoresAddCtrl
 * @description
 * # TrabajadoresAddCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('TrabajadoresAddCtrl', function ($scope, trabajadoresService,
    $state, $utilsViewService) {
    $scope.loading = false;
    
    $scope.init = function() {
        $scope.trabajador = {};
    };
        
    $scope.save = function(trabajador) {
        $utilsViewService.disable('.btn-submit');

        trabajadoresService.save(trabajador, function(data) {
            $state.go('trabajadoresIndex', {response: data});
        }, function (err) {
            $state.go('trabajadoresIndex', {response: err});
        });

    };
    $scope.init();
});
'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:TrabajadoresViewCtrl
 * @description
 * # TrabajadoresViewCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('TrabajadoresViewCtrl', function ($scope, $uibModalInstance, 
    trabajador) {

    $scope.init = function() {
        $scope.trabajador = angular.copy(trabajador);
    };
    
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.init();
});
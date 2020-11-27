'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:TrabajadoresEditCtrl
 * @description
 * # TrabajadoresEditCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('TrabajadoresEditCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, trabajadoresService, trabajador) {

    $scope.init = function() {    
        $scope.trabajador = angular.copy(trabajador);
    };
    
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function(trabajador) {
        $utilsViewService.disable('.btn-submit');
        
        trabajadoresService.update(trabajador, function (data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };

    $scope.init();
});
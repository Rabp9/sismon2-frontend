'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:ActividadestiposViewCtrl
 * @description
 * # ActividadestiposViewCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('ActividadestiposViewCtrl', function ($scope, $uibModalInstance, 
    actividadesTipo) {

    $scope.init = function() {
        $scope.actividadesTipo = angular.copy(actividadesTipo);
    };
    
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.init();
});
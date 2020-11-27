'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:ActividadestiposEditCtrl
 * @description
 * # ActividadestiposEditCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
  .controller('ActividadestiposEditCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, actividadesTiposService, actividadesTipo) {

    $scope.init = function() {    
        $scope.actividadesTipo = angular.copy(actividadesTipo);
    };
    
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function(actividadesTipo) {
        $utilsViewService.disable('.btn-submit');
        
        actividadesTiposService.update(actividadesTipo, function (data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };

    $scope.init();
});
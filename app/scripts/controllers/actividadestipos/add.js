'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:ActividadestiposAddCtrl
 * @description
 * # ActividadestiposAddCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('ActividadestiposAddCtrl', function ($scope, actividadesTiposService,
    $state, $utilsViewService) {
    $scope.loading = false;
    
    $scope.init = function() {
        $scope.actividadesTipo = {};
    };
        
    $scope.save = function(actividadesTipo) {
        $utilsViewService.disable('.btn-submit');

        actividadesTiposService.save(actividadesTipo, function(data) {
            $state.go('actividadesTiposIndex', {response: data});
        }, function (err) {
            $state.go('actividadesTiposIndex', {response: err});
        });

    };
    $scope.init();
});
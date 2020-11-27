'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:UsersAddCtrl
 * @description
 * # UsersAddCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('UsersAddCtrl', function ($scope, usersService,
    $state, $utilsViewService) {
    $scope.loading = false;
    
    $scope.init = function() {
        $scope.user = {};
    };
        
    $scope.save = function(user) {
        $utilsViewService.disable('.btn-submit');

        usersService.save(user, function(data) {
            $state.go('usersIndex', {response: data});
        }, function (err) {
            $state.go('usersIndex', {response: err});
        });

    };
    $scope.init();
});
'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:UsersViewCtrl
 * @description
 * # UsersViewCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('UsersViewCtrl', function ($scope, $uibModalInstance, 
    user) {

    $scope.init = function() {
        $scope.user = angular.copy(user);
    };
    
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.init();
});
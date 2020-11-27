'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:UsersEditCtrl
 * @description
 * # UsersEditCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('UsersEditCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, usersService, user) {

    $scope.init = function() {    
        $scope.user = angular.copy(user);
    };
    
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function(user) {
        $utilsViewService.disable('.btn-submit');
        delete user.trabajador;
        usersService.update(user, function (data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };

    $scope.init();
});
'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:UsersAsignarCtrl
 * @description
 * # UsersAsignarCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('UsersAsignarCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, usersService, user, trabajadoresService) {

    $scope.init = function() {    
        $scope.user = angular.copy(user);
        $scope.getTrabajadores();
    };
    
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function(user, trabajadorIdSelected) {
        $utilsViewService.disable('.btn-submit');
        delete user.trabajador;
        user.trabajador_id = trabajadorIdSelected;
        usersService.update(user, function (data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.getTrabajadores = function() {
        $scope.loadingTrabajadores = "Cargando...";
        trabajadoresService.getWithoutUser(function(data) {
            $scope.trabajadores = data.trabajadores;
            $scope.loadingTrabajadores = "Seleccione un Trabajador";
        });
    };

    $scope.init();
});
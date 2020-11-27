'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:UsersLoginCtrl
 * @description
 * # UsersLoginCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('UsersLoginCtrl', function ($scope, usersService, $cookies, $state, $rootScope, $utilsViewService) {
    
    $scope.loginUser = function(user, boton) {
        $('#' + boton).text('Login...');
        $utilsViewService.disable('#' + boton);
        
        usersService.login({
            username: user.username,
            password: user.password
        }, function(data) {
            if (data.user === null) {
                $scope.message = data.message;
                $utilsViewService.enable('#' + boton);
                $('#' + boton).text('Login');
            } else {
                $cookies.putObject('sismon-user', data.user);
                // $cookies.put('sismon-token', data.token);
                $rootScope.user = data.user;
                $rootScope.logged = true;
                $state.go('main');
            }
        }, function(err) {
            $utilsViewService.enable('#' + boton);
            $('#' + boton).text('Login');
            $scope.message = err.data;
        });
    };
});
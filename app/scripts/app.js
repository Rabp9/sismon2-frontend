'use strict';

/**
 * @ngdoc overview
 * @name sismon2FrontendApp
 * @description
 * # sismon2FrontendApp
 *
 * Main module of the application.
 */
angular
.module('sismon2FrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.grid',
    'ui.grid.cellNav',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.resizeColumns',
    'ui.bootstrap',
    'ngMap',
    'angularValidator',
    'scrollable-table'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('oauthHttpInterceptor');
    var mainState = {
        name: 'main',
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        title: 'Inicio'
    };
    
    var interseccionesIndexState = {
        name: 'interseccionesIndex',
        url: '/intersecciones',
        templateUrl: 'views/intersecciones/index.html',
        controller: 'InterseccionesIndexCtrl',
        controllerAs: 'interseccionesIndex',
        title: 'Intersecciones'
    };
    
    $stateProvider.state(mainState);
    $stateProvider.state(interseccionesIndexState);
    $urlRouterProvider.when('', '/');
}).run(function($rootScope, $state, $window, $interval, $timeout, $cookies, $location) {
    /*
    $rootScope.logged = false;
    if ($cookies.get('sanesactt-token')) {
        $rootScope.logged = true;
        $rootScope.user = $cookies.getObject('sanesactt-user');
    } else {
        $rootScope.logged = false;
    }
    
    $rootScope.$state = $state;
    
   
    $rootScope.$on('$stateChangeSuccess', function(event, toParams, fromState, fromParams) {
        $rootScope.title = $state.current.title;
        $window.scrollTo(0, 0);
    });
    
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (!$rootScope.logged) {
            if (toState.name !== 'usersLogin') {
                $location.path('/users/login');
            }
        } else {
            if ($rootScope.user.rol_user.rol.permisos.search(toState.controllerAs) >= 0) {
                $rootScope.message_root = null;
                if (toState.controllerAs === 'ubicacionesDatos') {
                    $('#nvbNavegador').css('display', 'none');
                    $('body').css('padding-top', 0);
                    $('#dvContainer').removeClass('container');
                    $('#dvContainer').addClass('container-fluid');
                } else {
                    $('#nvbNavegador').css('display', 'block');
                    $('body').css('padding-top', '50px');
                    $('#dvContainer').removeClass('container-fluid');
                    $('#dvContainer').addClass('container');
                }
            } else {
                if (toState.controllerAs !== 'main' && toState.controllerAs !== 'usersLogin') {
                    event.preventDefault();
                    $rootScope.message_root = {
                        type: 'error',
                        text: 'No tiene permisos'
                    };
                }
            }
        }
    });
    
    $rootScope.logout = function() {
        if (confirm('¿Está seguro de cerrar sesión?')) {
            $cookies.remove('sanesactt-user');
            $cookies.remove('sanesactt-token');
            $rootScope.user = undefined;
            $rootScope.logged = false;
            $state.go('usersLogin');
        }
    };
    */
});
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
    'ui.bootstrap',
    'ngMap',
    'angularValidator',
    'scrollable-table',
    'checklist-model'
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
        title: 'Intersecciones',
        params: {response: null} 
    };
    
    var interseccionesAddState = {
        name: 'interseccionesAdd',
        url: '/intersecciones/add',
        templateUrl: 'views/intersecciones/add.html',
        controller: 'InterseccionesAddCtrl',
        controllerAs: 'interseccionesAdd',
        title: 'Nueva Intersección'
    };
    
    var trabajosRegistrarState = {
        name: 'trabajosRegistrar',
        url: '/trabajos/registrar',
        templateUrl: 'views/trabajos/registrar.html',
        controller: 'TrabajosRegistrarCtrl',
        controllerAs: 'trabajaosRegistrar',
        title: 'Registrar Trabajo'
    };
    
    var reportesActividadesState = {
        name: 'reportesActividades',
        url: '/reportes/actividades',
        templateUrl: 'views/reportes/actividades.html',
        controller: 'ReportesActividadesCtrl',
        controllerAs: 'reportesActividades',
        title: 'Reporte de Actividades'
    };
    
    var reportesActividadesWebState = {
        name: 'reportesActividadesWeb',
        url: '/reportes/actividades/web',
        templateUrl: 'views/reportes/actividades-web.html',
        controller: 'ReportesActividadesWebCtrl',
        controllerAs: 'reportesSctividadesWeb',
        title: 'Reporte de Actividades',
        params: {actividades: null} 
    };
    
    var usersIndexState = {
        name: 'usersIndex',
        url: '/users',
        templateUrl: 'views/users/index.html',
        controller: 'UsersIndexCtrl',
        controllerAs: 'usersIndex',
        title: 'Usuarios',
        params: {response: null} 
    };
    
    var usersAddState = {
        name: 'usersAdd',
        url: '/users/add',
        templateUrl: 'views/users/add.html',
        controller: 'UsersAddCtrl',
        controllerAs: 'usersAdd',
        title: 'Nuevo Usuario'
    };
    
    var usersLoginState = {
        name: 'usersLogin',
        url: '/users/login',
        templateUrl: 'views/users-login.html',
        controller: 'UsersLoginCtrl',
        controllerAs: 'usersLogin',
        title: 'Login'
    };
    
    var trabajadoresIndexState = {
        name: 'trabajadoresIndex',
        url: '/trabajadores',
        templateUrl: 'views/trabajadores/index.html',
        controller: 'TrabajadoresIndexCtrl',
        controllerAs: 'trabajadoresIndex',
        title: 'Trabajadores',
        params: {response: null} 
    };
    
    var trabajadoresAddState = {
        name: 'trabajadoresAdd',
        url: '/trabajadores/add',
        templateUrl: 'views/trabajadores/add.html',
        controller: 'TrabajadoresAddCtrl',
        controllerAs: 'trabajadoresAdd',
        title: 'Nuevo Trabajador'
    };
    
    var actividadesTiposIndexState = {
        name: 'actividadesTiposIndex',
        url: '/actividadesTipos',
        templateUrl: 'views/actividadesTipos/index.html',
        controller: 'ActividadestiposIndexCtrl',
        controllerAs: 'actividadesTiposIndex',
        title: 'Tipos de Actividades',
        params: {response: null} 
    };
    
    var actividadesTiposAddState = {
        name: 'actividadesTiposAdd',
        url: '/actividadesTipos/add',
        templateUrl: 'views/actividadesTipos/add.html',
        controller: 'ActividadestiposAddCtrl',
        controllerAs: 'actividadesTiposAdd',
        title: 'Nuevo Tipo de Actividad'
    };
    
    var mapaState = {
        name: 'mapa',
        url: '/mapa',
        templateUrl: 'views/mapa.html',
        controller: 'MapaCtrl',
        controllerAs: 'mapa',
        title: 'Red Semafórica de Trujillo'
    };
    
    var actividadesIndexState = {
        name: 'actividadesIndex',
        url: '/actividades',
        templateUrl: 'views/actividades/index.html',
        controller: 'ActividadesIndexCtrl',
        controllerAs: 'actividadesIndex',
        title: 'Actividades',
        params: {response: null} 
    };
    
    var actividadesViewState = {
        name: 'actividadesView',
        url: '/actividades/{actividad_id}',
        templateUrl: 'views/actividades/view.html',
        controller: 'ActividadesViewCtrl',
        controllerAs: 'actividadesView',
        title: 'Detalle de Actividad',
        params: {actividad_id: null} 
    };
    
    var actividadesRegistrarState = {
        name: 'actividadesRegistrar',
        url: '/actividades/registrar',
        templateUrl: 'views/actividades/registrar.html',
        controller: 'ActividadesRegistrarCtrl',
        controllerAs: 'actividadesRegistrar',
        title: 'Registrar Actividad'
    };
    
    var actividadesEditState = {
        name: 'actividadesEdit',
        url: '/actividades/{actividad_id}/edit',
        templateUrl: 'views/actividades/edit.html',
        controller: 'ActividadesEditCtrl',
        controllerAs: 'actividadesEdit',
        title: 'Modificar Actividad',
        params: {actividad_id: null} 
    };
    
    $stateProvider.state(mainState);
    $stateProvider.state(interseccionesIndexState);
    $stateProvider.state(interseccionesAddState);
    $stateProvider.state(trabajosRegistrarState);
    $stateProvider.state(reportesActividadesState);
    $stateProvider.state(reportesActividadesWebState);
    $stateProvider.state(usersIndexState);
    $stateProvider.state(usersAddState);
    $stateProvider.state(usersLoginState);
    $stateProvider.state(trabajadoresIndexState);
    $stateProvider.state(trabajadoresAddState);
    $stateProvider.state(actividadesTiposIndexState);
    $stateProvider.state(actividadesTiposAddState);
    $stateProvider.state(mapaState);
    $stateProvider.state(actividadesIndexState);
    $stateProvider.state(actividadesViewState);
    $stateProvider.state(actividadesRegistrarState);
    $stateProvider.state(actividadesEditState);
    $urlRouterProvider.when('', '/');
}).run(function($rootScope, $state, $window, $interval, $timeout, $cookies, $location, $transitions) {

    $rootScope.logged = false;
    if ($cookies.get('sismon-user')) {
        $rootScope.logged = true;
        $rootScope.user = $cookies.getObject('sismon-user');
    } else {
        $rootScope.logged = false;
    }
    
    $rootScope.$state = $state;
    
    $transitions.onSuccess({}, function() {
        $rootScope.title = $state.current.title;
        $window.scrollTo(0, 0);
    });
    
    $transitions.onStart({}, function(trans) {
        var $state = trans.router.stateService;
        if (!$rootScope.logged) {
            if (trans.$to().name !== 'usersLogin') {
                return $state.target('usersLogin');
            }
        }
    });

    $rootScope.logout = function() {
        if (confirm('¿Está seguro de cerrar sesión?')) {
            $cookies.remove('sismon-user');
            $rootScope.user = undefined;
            $rootScope.logged = false;
            $state.go('usersLogin');
        }
    };
});
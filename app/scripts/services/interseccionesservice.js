'use strict';

/**
 * @ngdoc service
 * @name sismon2FrontendApp.interseccionesService
 * @description
 * # interseccionesService
 * Factory in the sismon2FrontendApp.
 */
angular.module('sismon2FrontendApp')
.factory('interseccionesService', function ($resource, envService) {
    return $resource(envService.getHost() + 'intersecciones/:id.json', {id: '@id'}, {
        update: {
            method: 'PUT'
        },
        disable: {
            method: 'POST',
            url: envService.getHost() + 'intersecciones/disable.json'
        },
        enable: {
            method: 'POST',
            url: envService.getHost() + 'intersecciones/enable.json'
        },
        getEnabled: {
            method: 'GET',
            url: envService.getHost() + 'intersecciones/getEnabled.json'
        },
        getWithActividades: {
            method: 'GET',
            url: envService.getHost() + 'intersecciones/getWithActividades.json'
        }
    });
});
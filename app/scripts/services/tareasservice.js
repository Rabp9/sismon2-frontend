'use strict';

/**
 * @ngdoc service
 * @name sismon2FrontendApp.tareasService
 * @description
 * # tareasService
 * Factory in the sismon2FrontendApp.
 */
angular.module('sismon2FrontendApp')
.factory('tareasService', function ($resource, envService) {
    return $resource(envService.getHost() + 'tareas/:id.json', {id: '@id'}, {
        getPendientesByActividad: {
            method: 'GET',
            url: envService.getHost() + 'tareas/getPendientesByActividad/:actividad_id.json'
        },
        getRealizadasByActividad: {
            method: 'GET',
            url: envService.getHost() + 'tareas/getRealizadasByActividad/:actividad_id.json'
        }
    });
});
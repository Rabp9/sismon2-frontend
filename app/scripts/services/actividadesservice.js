'use strict';

/**
 * @ngdoc service
 * @name sismon2FrontendApp.actividadesService
 * @description
 * # actividadesService
 * Factory in the sismon2FrontendApp.
 */
angular.module('sismon2FrontendApp')
.factory('actividadesService', function ($resource, envService) {
    return $resource(envService.getHost() + 'actividades/:id.json', {id: '@id'}, {
        update: {
            method: 'PUT'
        },
        getPendientes: {
            method: 'GET',
            url: envService.getHost() + 'actividades/:actividades_tipo_id/getPendientes.json'
        },
        report: {
            method: 'POST',
            url: envService.getHost() + 'actividades/report.json'
        },
        disable: {
            method: 'POST',
            url: envService.getHost() + 'actividades/disable.json'
        },
        enable: {
            method: 'POST',
            url: envService.getHost() + 'actividades/enable.json'
        },
        register: {
            method: 'POST',
            url: envService.getHost() + 'actividades/register.json'
        }
    });
});
'use strict';

/**
 * @ngdoc service
 * @name sismon2FrontendApp.actividadesTiposService
 * @description
 * # actividadesTiposService
 * Factory in the sismon2FrontendApp.
 */
angular.module('sismon2FrontendApp')
.factory('actividadesTiposService', function ($resource, envService) {
    return $resource(envService.getHost() + 'actividades-tipos/:id.json', {id: '@id'}, {
        update: {
            method: 'PUT'
        },
        getList: {
            method: 'GET',
            url: envService.getHost() + 'actividades-tipos/getList.json'
        },
        disable: {
            method: 'POST',
            url: envService.getHost() + 'actividades-tipos/disable.json'
        },
        enable: {
            method: 'POST',
            url: envService.getHost() + 'actividades-tipos/enable.json'
        }
    });
});
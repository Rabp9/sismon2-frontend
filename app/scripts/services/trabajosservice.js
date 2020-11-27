'use strict';

/**
 * @ngdoc service
 * @name sismon2FrontendApp.trabajosService
 * @description
 * # trabajosService
 * Factory in the sismon2FrontendApp.
 */
angular.module('sismon2FrontendApp')
.factory('trabajosService', function ($resource, envService) {
    return $resource(envService.getHost() + 'trabajos/:id.json', {id: '@id'}, {
        register: {
            method: 'POST',
            url: envService.getHost() + 'trabajos/register.json'
        }
    });
});
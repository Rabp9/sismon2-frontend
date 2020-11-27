'use strict';

/**
 * @ngdoc service
 * @name sismon2FrontendApp.trabajadoresService
 * @description
 * # trabajadoresService
 * Factory in the sismon2FrontendApp.
 */
angular.module('sismon2FrontendApp')
  .factory('trabajadoresService', function ($resource, envService) {
    return $resource(envService.getHost() + 'trabajadores/:id.json', {id: '@id'}, {
        update: {
            method: 'PUT'
        },
        getList: {
            method: 'GET',
            url: envService.getHost() + 'trabajadores/getList.json'
        },
        disable: {
            method: 'POST',
            url: envService.getHost() + 'trabajadores/disable.json'
        },
        enable: {
            method: 'POST',
            url: envService.getHost() + 'trabajadores/enable.json'
        },
        getWithoutUser: {
            method: 'GET',
            url: envService.getHost() + 'trabajadores/getWithoutUser.json'
        }
    });
});
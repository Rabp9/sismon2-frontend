'use strict';

/**
 * @ngdoc service
 * @name sanesacttFrontendApp.usersservice
 * @description
 * # usersservice
 * Factory in the sanesacttFrontendApp.
 */
angular.module('sismon2FrontendApp')
.factory('usersService', function ($resource, envService) {
    return $resource(envService.getHost() + 'users/:id.json', {id: '@id'}, {
        login: {
            method: 'POST',
            url: envService.getHost() + 'users/login/.json'
        },
        disable: {
            method: 'POST',
            url: envService.getHost() + 'users/disable.json'
        },
        enable: {
            method: 'POST',
            url: envService.getHost() + 'users/enable.json'
        },
        update: {
            method: 'PUT'
        }
    });
});
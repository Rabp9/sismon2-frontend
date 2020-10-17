'use strict';

/**
 * @ngdoc service
 * @name sismon2FrontendApp.oauthHttpInterceptor
 * @description
 * # oauthHttpInterceptor
 * Factory in the sismon2FrontendApp.
 */
angular.module('sismon2FrontendApp')
.factory('oauthHttpInterceptor', function ($cookies) {
    return {
        request: function (config) {
            // config.headers.Authorization = 'Bearer ' + $cookies.get('sismon-token');
            return config;
        }
    };
});
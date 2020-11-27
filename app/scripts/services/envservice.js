'use strict';

/**
 * @ngdoc service
 * @name sismon2FrontendApp.envService
 * @description
 * # envService
 * Factory in the sismon2FrontendApp.
 */
angular.module('sismon2FrontendApp')
.factory('envService', function () {
    return {
        getHost: function() {
            switch (window.location.hostname) {
                case 'localhost':
                    return 'http://localhost:8765/api/';
            }
        }
    };
});
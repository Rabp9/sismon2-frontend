'use strict';

/**
 * @ngdoc service
 * @name sismon2FrontendApp.$utilsViewService
 * @description
 * # $utilsViewService
 * Factory in the sismon2FrontendApp.
 */
angular.module('sismon2FrontendApp')
.factory('$utilsViewService', function () {
    return {
        enable: function(id) {
            $(id).removeClass('disabled');
            $(id).prop('disabled', false);
        },
        disable: function(id) {
            $(id).addClass('disabled');
            $(id).prop('disabled', true);
        },
        formatDateToSql: function(fecha) {
            if (fecha === undefined) {
                return undefined;
            }
            return fecha.getFullYear() + '-' + this.str_pad((fecha.getMonth() + 1), '00') + '-' + this.str_pad(fecha.getDate(), '00');
        },
        str_pad: function(str, pad) {
            return pad.substring(0, (pad.length - str.toString().length)) + str;
        },
        formatDateToJs: function(fecha) {
            var dateParts = fecha.split("-");
            var jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
            return jsDate;
        }
    };
});
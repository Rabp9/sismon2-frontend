'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:ReportesActividadesWebCtrl
 * @description
 * # ReportesActividadesWebCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('ReportesActividadesWebCtrl', function ($scope, $stateParams) {
    $scope.init = function() {
        $scope.table = {
            actividadesWs: {
                wId: '6%',
                wDescripcion: '29%',
                wFechaRegistro: '10%',
                wActividadesTipo: '28%',
                wResponsable: '19%',
                wEstado: '8%'
            }
        };
        
        if ($stateParams.actividades !== null) {
            $scope.actividades = $stateParams.actividades;
            if ($stateParams.formatoReporte === 'PDF') {
//                setTimeout($scope.exportPDF(), 5000);
            }
        }
    };
    
    $scope.exportPDF = function() {
        $('#btnPrint').hide();
        window.print();
        $('#btnPrint').show();
    };
    $scope.init();
});
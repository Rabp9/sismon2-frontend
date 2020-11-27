'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:ReportesActividadesCtrl
 * @description
 * # ReportesActividadesCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('ReportesActividadesCtrl', function ($scope, actividadesTiposService, actividadesService, $utilsViewService,
    interseccionesService, $state) {
    $scope.init = function() {
        $scope.table = {
            loading: true,
            interseccionesWs: {
                wId: '9%',
                wDescripcion: '58%',
                wCodigo: '13%',
                wAcciones: '20%'
            }
        };
        $scope.getActividadesTipos();
        $scope.getIntersecciones();
    };
    
    $scope.getActividadesTipos = function() {
        $scope.loadingActividadesTipos = "Cargando...";
        $scope.loadingActividadesPendientes = "Cargando...";
        $scope.actividades = null;
        actividadesTiposService.getList(function(data) {
            $scope.actividadesTipos = data.actividadesTipos;
            $scope.loadingActividadesTipos = "Seleccione un Tipo de Actividad";
            $scope.loadingActividadesPendientes =  "Seleccione una Actividad";
        });
    };
    
    $scope.getIntersecciones = function() {
        $scope.intersecciones = [];
        $scope.table.loading = true;
        interseccionesService.getEnabled(function(data) {
            $scope.intersecciones = data.intersecciones;
            $scope.table.loading = false;
        });
    };
    
    $scope.report = function(pre_fechaDesde, pre_fechaHasta, actividadesTipoSelected, interseccionesSelected) {
        $utilsViewService.disable('.btn-submit');
        let interseccionesIdsSelected = interseccionesSelected.map(interseccion => interseccion.id);
        actividadesService.report({
            actividadesTipoIdSelected: actividadesTipoSelected.id,
            interseccionesIdsSelected: interseccionesIdsSelected,
            fechaDesde: $utilsViewService.formatDateToSql(pre_fechaDesde),
            fechaHasta: $utilsViewService.formatDateToSql(pre_fechaHasta)
        }, function(data) {
            $state.go('reportesActividadesWeb', {actividades: data.actividades});
            $utilsViewService.enable('.btn-submit');
        });
    };
    
    $scope.init();
});
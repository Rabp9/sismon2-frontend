'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:ActividadesEditCtrl
 * @description
 * # ActividadesEditCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('ActividadesEditCtrl', function ($scope, $stateParams, actividadesService, $q, actividadesTiposService, 
    trabajadoresService, $utilsViewService, $uibModal, $state) {
        
    $scope.init = function() {
        $scope.tableTareas = {
            loading: true,
            tareasWs: {
                wId: '5%',
                wInterseccion: '15%',
                wDescripcion: '15%',
                wDificultad: '10%',
                wPrioridad: '10%',
                wFechaProgramada: '11%',
                wFechaRealizada: '11%',
                wEstado: '13%',
                wAcciones: '10%'
            }
        };
        
        $scope.loadingActividadesTipos = "Cargando...";
        $scope.loadingTrabajadores = "Cargando...";
        $scope.tableTareas.loading = true;
        
        if ($stateParams.actividad_id !== null) {
            
            $q.all([
                actividadesTiposService.getList().$promise,
                trabajadoresService.getList().$promise,
                actividadesService.get({
                    id: $stateParams.actividad_id
                }).$promise
                ]).then(function(data) {

                    $scope.actividadesTipos = data[0].actividadesTipos;
                    $scope.loadingActividadesTipos = "Seleccione un Tipo de Actividad";
            
                    $scope.trabajadores = data[1].trabajadores;
                    $scope.loadingTrabajadores = "Seleccione un Trabajador";
                    
                    $scope.actividad = data[2].actividad;
                    $scope.tableTareas.loading = false;
                });
        }
    };
    
    $scope.editTarea = function(tarea) {
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/actividades/edit-tarea.html',
            controller: 'ActividadesEditTareaCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                tarea: function() {
                    return tarea;
                } 
            }
        });

        modalInstanceEdit.result.then(function (tareaEdited) {
            var index = $scope.actividad.tareas.indexOf(tarea);
            $scope.actividad.tareas[index] = tareaEdited;
        });
    };
    
    $scope.save = function() {
        if (!confirm('¿Está seguro de modificar esta actividad?')) {
            return;
        }
        var actividad = angular.copy($scope.actividad);
        var tareas = actividad.tareas;
        
        delete actividad.actividades_intersecciones_detalles;
        delete actividad.actividades_tipo;
        delete actividad.trabajador;
        delete actividad.tareas;
        
        tareas = tareas.map(function(tarea) {
            delete tarea.interseccion;
            delete tarea.pre_fecha_programada;
            delete tarea.trabajadoresInvolucrados;
            return tarea;
        });
        
        $utilsViewService.disable('.btn-submit');
        
        actividadesService.update({
            id: actividad.id,
            actividad: actividad,
            tareas: tareas
        }, function(data) {
            $scope.message = data.message;
            $utilsViewService.enable('.btn-submit');
            $scope.ActiivdadEdit.reset();
            $scope.init();
            $scope.active = 0;
        });
    };
    
    $scope.gotoView = function() {
        if (confirm("¿Está seguro de ver el detalle de la actividad, perderá todo lo ingresado hasta el momento?")) {
            $state.go('actividadesView', {actividad_id: $scope.actividad.id});
        }
    };
    
    $scope.init();
});
'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:TrabajosRegistrarCtrl
 * @description
 * # TrabajosRegistrarCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('TrabajosRegistrarCtrl', function ($scope, actividadesTiposService, actividadesService, 
    trabajadoresService, tareasService, $utilsViewService, trabajosService) {
    $scope.init = function() {
        $scope.actividadesTipos = [];
        $scope.actividades = [];
        $scope.trabajadores = [];
        $scope.tareasTrabajadoresDetalles = [];
        $scope.tareasRealizadas = [];
        $scope.trabajo = {};
        $scope.tareas = [];
        $scope.tableTrabajadores = {
            loading: true,
            trabajadoresSelected: [],
            trabajadoresWs: {
                wId: '10%',
                wFullName: '60%',
                wDni: '20%',
                wAcciones: '10%'
            }
        };
        $scope.tableTareas = {
            loading: false,
            tareasSelected: [],
            tareasWs: {
                wId: '7%',
                wDescripcion: '32%',
                wFechaProgramada: '17%',
                wInterseccion: '32%',
                wAcciones: '12%'
            }
        };
        $scope.loadingActividadesPendientes = "Seleccione una Actividad";
        $scope.getActividadesTipos();
        $scope.getTrabajadores();
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
    
    $scope.getActividadesPendientes = function(actividadesTipoIdSelected) {
        if (actividadesTipoIdSelected !== "") {
            $scope.loadingActividadesPendientes = "Cargando...";
            actividadesService.getPendientes({
                actividades_tipo_id: actividadesTipoIdSelected
            }, function(data) {
                $scope.actividades = data.actividades;
                $scope.loadingActividadesPendientes =  "Seleccione una Actividad";
            });
        }
    };
    
    $scope.getTrabajadores = function() {
        $scope.tableTrabajadores.loading = true;
        trabajadoresService.getList(function(data) {
            $scope.trabajadores = data.trabajadores;
            $scope.tableTrabajadores.loading = false;
        });
    };
    
    $scope.getTareasByActividad = function(actividadIdSelected) {
        if (actividadIdSelected === "") {
            $scope.tareas = [];
            $scope.tableTareas.loading = false;
            return;
        }
        $scope.tableTareas.loading = true;
        tareasService.getPendientesByActividad({
            actividad_id: actividadIdSelected
        },function(data) {
            $scope.tareas = data.tareas;
            $scope.tableTareas.loading = false;
        });
    };
    
    $scope.addTarea = function(tareasSelected) {
        if (tareasSelected.length === 0) {
            alert('No ha selecciona ninguna tarea');
            return;
        }
        if ($scope.tareasRealizadas.length === 0) {
            $scope.tareasRealizadas = $scope.tareasRealizadas.concat(angular.copy(tareasSelected));
            $scope.tableTareas.tareasSelected = [];
            return;
        }
        var tareas = angular.copy(tareasSelected);
        var tareasNoDuplicadas = [];
        angular.forEach(tareas, function(value_t, key_t) {
            var encontrado = false;
            angular.forEach($scope.tareasRealizadas, function(value_r, key_r) {
                if (value_t.id === value_r.id) {
                    encontrado = true;
                }
            });
            if (!encontrado) {
                tareasNoDuplicadas.push(value_t);
            }
        });

        $scope.tareasRealizadas = $scope.tareasRealizadas.concat(tareasNoDuplicadas);
        $scope.tableTareas.tareasSelected = [];
    };
    
    $scope.removeTarea = function(tarea) {
        var index = $scope.tareasRealizadas.indexOf(tarea);
        $scope.tareasRealizadas.splice(index, 1);
    };
    
    $scope.formatDate = function(pre_fecha) {
        $scope.trabajo.fecha_registro = $utilsViewService.formatDateToSql(pre_fecha);
    };
    
    $scope.save = function(trabajo, tareasRealizadas, trabajadoresSelected) {
        if (trabajo.fecha_registro === undefined) {
            alert('Seleccione una fecha');
            return;
        }
        if (tareasRealizadas.length === 0) {
            alert('Seleccione tareas');
            return;
        }
        if (trabajadoresSelected.length === 0) {
            alert('Seleccione trabajadores');
            return;
        }
        if (!confirm("¿Está seguro de registrar este trabajo?")) {
            return;
        }
        $utilsViewService.disable('.btn-submit');
        
        trabajo.estado_id = 1;
        let tareasIds = tareasRealizadas.map(tarea => tarea.id);
        let trabajadoresIds = trabajadoresSelected.map(trabajador => trabajador.id);
        var tareasTrabajadoresDetalles = [];
        angular.forEach(tareasIds, function(v_tarea, k_tarea) {
            angular.forEach(trabajadoresIds, function(v_trabajador, k_trabajador) {
                tareasTrabajadoresDetalles.push({
                    fecha_realizada: trabajo.fecha_registro,
                    tarea_id: v_tarea,
                    trabajador_id: v_trabajador
                });
            }); 
        });
        
        trabajosService.register({
            trabajo: trabajo,
            tareasIds: tareasIds,
            tareasTrabajadoresDetalles: tareasTrabajadoresDetalles
        }, function(data) {
            $scope.message = data.message;
            $scope.errors = data.errors;
            
            $utilsViewService.enable('.btn-submit');
            $scope.init();
            $scope.TrabajoRegister.reset();
            $scope.active = 0;
        }, function (err) {
            $scope.errors = err.errors;
            $scope.message = err.message;
        });
    };
    
    $scope.goStep = function(stepFrom, stepTo) {
        if (stepFrom === 0 && stepTo === 1) {
            if ($scope.tareasRealizadas.length === 0) {
                alert('Debe seleccionar por lo menos una tarea');
                return;
            }
        }
        
        if (stepFrom === 1 && stepTo === 2) {
            if ($scope.tableTrabajadores.trabajadoresSelected.length === 0) {
                alert('Debe seleccionar por lo menos un trabajador');
                return;
            }
        }
        
        $scope.active = stepTo;
    };

    $scope.init();
});
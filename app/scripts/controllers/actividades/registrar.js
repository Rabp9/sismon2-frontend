'use strict';

/**
 * @ngdoc function
 * @name sismon2FrontendApp.controller:ActividadesRegistrarCtrl
 * @description
 * # ActividadesRegistrarCtrl
 * Controller of the sismon2FrontendApp
 */
angular.module('sismon2FrontendApp')
.controller('ActividadesRegistrarCtrl', function ($scope, actividadesTiposService, trabajadoresService, NgMap,
    interseccionesService, $utilsViewService, $rootScope, actividadesService, $state) {
        
    $scope.init = function() {
        $scope.actividad = {
            fecha_registro: $utilsViewService.formatDateToSql(new Date())
        };
        $scope.newTareaGeneral = {};
        $scope.newTareaAdicional = {};
        $scope.tareas = [];
        
        $scope.tableTareasGeneral = {
            tareasGeneralWs: {
                wDescripcion: '65%',
                wDificultad: '10%',
                wPrioridad: '10%',
                wAcciones: '15%'
            }
        };
        
        $scope.tableTareasAdicional = {
            tareasAdicionalWs: {
                wDescripcion: '50%',
                wFechaProgramada: '15%',
                wDificultad: '10%',
                wPrioridad: '10%',
                wAcciones: '15%'
            }
        };
        
        $scope.tableTareas = {
            tareasWs: {
                wInterseccion: '30%',
                wDescripcion: '30%',
                wDificultad: '10%',
                wPrioridad: '10%',
                wFechaProgramada: '10%',
                wAcciones: '10%'
            }
        };
        
        $scope.tableTareasConfirmar = {
            tareasConfirmarWs: {
                wInterseccion: '32%',
                wDescripcion: '32%',
                wDificultad: '12%',
                wPrioridad: '12%',
                wFechaProgramada: '12%'
            }
        };
        
        $scope.tableInterseccionesSelected = {
            interseccionesSelectedWs: {
                wDescripcion: '60%',
                wCodigo: '20%',
                wAcciones: '20%'
            }
        };
        
        $scope.tableInterseccionesConfirmar = {
            interseccionesConfirmarWs: {
                wId: '20%',
                wDescripcion: '60%',
                wCodigo: '20%'
            }
        };
        
        $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY';

        NgMap.getMap().then(function(map) {
            $scope.map = map;
        });
        $scope.loadingActividadesTipos = "";
        $scope.loadingTrabajadores = "";
        $scope.getActividadesTipos();
        $scope.getTrabajadores();
        $scope.getIntersecciones();
        $scope.tareasGeneral = [];
        $scope.tareasAdicional = [];
        $scope.tareasConfirmar = [];
        $scope.interseccionesSelected = [];
        $scope.actividadesInterseccionesDetalles = [];
        $scope.loadingRegister = false;
        $scope.active = 0;
    };
    
    $scope.getActividadesTipos = function() {
        $scope.loadingActividadesTipos = "Cargando...";
        actividadesTiposService.getList(function(data) {
            $scope.actividadesTipos = data.actividadesTipos;
            $scope.loadingActividadesTipos = "Seleccione un Tipo de Actividad";
        });
    };
    
    $scope.getTrabajadores = function() {
        $scope.loadingTrabajadores = "Cargando...";
        trabajadoresService.getList(function(data) {
            $scope.trabajadores = data.trabajadores;
            $scope.loadingTrabajadores = "Seleccione un Trabajador";
        });
    };
    
    $scope.getIntersecciones = function() {
        $scope.loadingIntersecciones = true;
        interseccionesService.getEnabled(function(data) {
            $scope.intersecciones = data.intersecciones;
            $scope.loadingIntersecciones = false;
            
            $scope.ubicacionLat = data.intersecciones[0].latitud;
            $scope.ubicacionLng = data.intersecciones[0].longitud;     
            
            if ($scope.intersecciones.length === 1) {
                $scope.includeMarkers = false;
            } else {
                $scope.includeMarkers = true;
            }
        });
    };
    
    $scope.addNewTareaGeneral = function(newTareaGeneral) {
        if (newTareaGeneral.descripcion === undefined || newTareaGeneral.descripcion === "") {
            alert('Ingrese una descripción');
            return;
        }
        if (newTareaGeneral.dificultad === undefined || newTareaGeneral.dificultad === "") {
            alert('Seleccione una dificultad');
            return;
        }
        if (newTareaGeneral.prioridad === undefined || newTareaGeneral.prioridad === "") {
            alert('Seleccione una prioridad');
            return;
        }
        $scope.tareasGeneral.push(angular.copy(newTareaGeneral));
        $scope.newTareaGeneral = {};
    };
    
    $scope.addNewTareaAdicional = function(newTareaAdicional) {
        if (newTareaAdicional.descripcion === undefined || newTareaAdicional.descripcion === "") {
            alert('Ingrese una descripción');
            return;
        }
        if (newTareaAdicional.fecha_programada === undefined || newTareaAdicional.fecha_programada === "") {
            alert('Ingrese una fecha');
            return;
        }
        if (newTareaAdicional.dificultad === undefined || newTareaAdicional.dificultad === "") {
            alert('Seleccione una dificultad');
            return;
        }
        if (newTareaAdicional.prioridad === undefined || newTareaAdicional.prioridad === "") {
            alert('Seleccione una prioridad');
            return;
        }
        newTareaAdicional.estado_id = 1;
        newTareaAdicional.interseccion_id = null;
        newTareaAdicional.fecha_registro = $utilsViewService.formatDateToSql(new Date());
        $scope.tareasAdicional.push(angular.copy(newTareaAdicional));
        $scope.newTareaAdicional = {};
    };
    
    $scope.removeTareaGeneral = function(tareaGeneral) {
        var index = $scope.tareasGeneral.indexOf(tareaGeneral);
        $scope.tareasGeneral.splice(index, 1);
    };
    
    $scope.removeTareaAdicional = function(tareaAdicional) {
        var index = $scope.tareasAdicional.indexOf(tareaAdicional);
        $scope.tareasAdicional.splice(index, 1);
    };
    
    $scope.addInterseccion = function(event, interseccion) {
        interseccion.marked = true;
        var index = $scope.interseccionesSelected.indexOf(interseccion);
        if (index === -1) {
            $scope.interseccionesSelected.push(interseccion);
        }
    };
    
    $scope.removeInterseccion = function(interseccion) {
        interseccion.marked = false;
        var index = $scope.interseccionesSelected.indexOf(interseccion);
        $scope.interseccionesSelected.splice(index, 1);
    };
    
    $scope.showInterseccion = function(event, interseccion) {
        $scope.selectedInterseccion = interseccion;
        $scope.map.showInfoWindow('myInfoWindow', this);
    };
    
    $scope.inicializarDetalles = function() {
        angular.forEach($scope.interseccionesSelected, function(interseccion_v, interseccion_k) {
            angular.forEach($scope.tareasGeneral, function(tarea_v, tarea_k) {
                var tarea = {
                    descripcion: tarea_v.descripcion,
                    dificultad: tarea_v.dificultad,
                    prioridad: tarea_v.prioridad,
                    fecha_registro: $scope.actividad.fecha_registro,
                    fecha_programada: new Date(),
                    fecha_realizada: null,
                    actividad_id: null,
                    trabajo_id: null,
                    interseccion: interseccion_v,
                    interseccion_id: interseccion_v.id,
                    estado_id: 1
                };
                $scope.tareas.push(tarea);
            });
        });
    };

    $scope.removeTarea = function(tarea) {
        if (confirm('¿Está seguro de eliminar esta tarea?')) {
            var index = $scope.tareas.indexOf(tarea);
            $scope.tareas.splice(index, 1);
        }
    };
    
    $scope.preConfirmacion = function() {
        $scope.tareasConfirmar = angular.copy($scope.tareas.concat($scope.tareasAdicional));
        $scope.actividad.actividades_tipo_id = $scope.actividad.actividades_tipo.id;
        $scope.actividad.trabajador_id = $scope.actividad.trabajador.id;
        $scope.actividad.user_id = $rootScope.user.id;
        $scope.actividad.estado_id = 1;
        
        $scope.tareasConfirmar = $scope.tareasConfirmar.map(function(tarea) {
            tarea.fecha_programada = $utilsViewService.formatDateToSql(tarea.fecha_programada);
            return tarea;
        });
        if ($scope.interseccionesSelected.length > 0) {
            $scope.ubicacionConfirmarLat = $scope.interseccionesSelected[0].latitud;
            $scope.ubicacionConfirmarLng = $scope.interseccionesSelected[0].longitud;     

            if ($scope.interseccionesSelected.length === 1) {
                $scope.includeMarkersConfirmar = false;
            } else {
                $scope.includeMarkersConfirmar = true;
            }
        }
    };

    $scope.register = function() {
        if (!confirm('¿Está seguro de registrar esta actividad?')) {
            return;
        }
        
        $scope.tareasConfirmar = $scope.tareasConfirmar.map(function(tarea) {
            delete tarea.interseccion;
            return tarea;
        });
        
        var interseccionesIdsSelected = $scope.interseccionesSelected.map(function(interseccion) {return interseccion.id;});
        
        $scope.loadingRegister = true;
        $utilsViewService.disable('.btn-submit');
        
        var actividad = angular.copy($scope.actividad);
        delete actividad.trabajador;
        delete actividad.actividades_tipo;
        
        actividadesService.register({
            actividad: actividad,
            tareas: $scope.tareasConfirmar,
            interseccionesIds: interseccionesIdsSelected
        }, function(data) {
            $scope.message = data.message;
            $scope.loadingRegister = false;
            $utilsViewService.enable('.btn-submit');
            $scope.ActiivdadRegister.reset();
            $scope.init();
        });
    };

    $scope.goStep = function(stepFrom, stepTo) {
        if (stepFrom === 0 && stepTo === 1) {
            if ($scope.ActiivdadRegister.actividadDescripcion.$invalid || 
                $scope.ActiivdadRegister.actividadActividadesTipo.$invalid || 
                $scope.ActiivdadRegister.actividadTrabajador.$invalid) {
                alert('No ha ingresado todos los datos necesarios');
                return;
            };
        }
        
        if (stepFrom === 1 && stepTo === 2) {
            if ($scope.interseccionesSelected.length === 0) {
                if (confirm('¿Está seguro de no seleccionar ninguna intersección? Si es así, continuará con la fase de Registrar las Tareas Adicionales?')) {                   
                    $scope.tareasGeneral = [];
                    $scope.tareas = [];
                    $scope.active = 4;
                    return;
                } else {
                    return;
                }
            };
        }
        
        if (stepFrom === 2 && stepTo === 3) {
            if ($scope.interseccionesSelected.length === 0) {
                alert('No ha seleccionado ninguna intersección');
                return;
            };
        }
        
        if (stepFrom === 2 && stepTo === 3) {
            if ($scope.tareasGeneral.length === 0) {
                alert('Debe registrar por lo menos una tarea');
                return;
            }
            $scope.inicializarDetalles();
        }
        
        if (stepFrom === 3 && stepTo === 2) {
            if ($scope.tareas.length > 0) {
                if (confirm('¿Está seguro de retroceder, se eliminará el detalle de las tareas?')) {
                    $scope.tareas = [];
                } else {
                    return;
                }
            }
        }
        
        if (stepFrom === 3 && stepTo === 4) {
            if ($scope.tareas.length === 0) {
                alert('No puede continuar si no ha registrado ninguna tarea')
                return;
            }
        }
        
        if (stepFrom === 4 && stepTo === 3) {
            if ($scope.tareas.length === 0) {
                $scope.active = 1;
                return;
            }
        }
        
        if (stepFrom === 4 && stepTo === 5) {
            if ($scope.tareas.length > 0) {
                if ($scope.tareasAdicional.length === 0) {
                    if (!confirm('¿Está seguro de no registrar ninguna tarea adicional?')) {
                        return;
                    }
                }
            } else {
                if ($scope.tareasAdicional.length === 0) {
                    alert('Debe registrar por lo menos una tarea adicional');
                    return;
                }
            }
            $scope.preConfirmacion();
        }
        
        if (stepFrom === 5 && stepTo === 4) {
            $scope.tareasConfirmar = [];
            
            $scope.ubicacionConfirmarLat = undefined;
            $scope.ubicacionConfirmarLng = undefined;     

            $scope.includeMarkersConfirmar = undefined;
        };
        
        $scope.active = stepTo;
    };

    $scope.gotoIndex = function() {
        if (confirm("¿Está seguro de ir a la lista de actividaes, perderá todo lo ingresado hasta el momento?")) {
            $state.go('actividadesIndex');
        }
    };

    $scope.init();
});
var registroGC;
var registroGC1;
app.reporteGeocercas = kendo.observable({
    onShow: function () {
        try {
            $("#NoOrdenGC").text(datos_Vehiculo.numeroorden);
            registroGC = "";
            var wd = (screen.width / 2) - 30;
            var wx = wd - 15;
            document.getElementById("FechaInicioGC").style.width = wd + "px";
            document.getElementById("FechaFinGC").style.width = wd + "px";
            var fecha = new Date();
            var year = fecha.getFullYear();
            var mes = fecha.getMonth();
            var dia = fecha.getDate();

            $("#FechaInicioGC").kendoDatePicker({
                ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#",
                min: new Date(1900, 0, 1),
                value: new Date(),
                format: "dd-MM-yyyy",
                max: new Date(year, mes, dia)
            });
            $("#FechaFinGC").kendoDatePicker({
                ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#",
                min: new Date(1900, 0, 1),
                max: new Date(year, mes, dia),
                value: new Date(),
                format: "dd-MM-yyyy"
            });
            //document.getElementById("FechaInicio").value = "01-01-1910";
            //ConsultarOT();
            //document.getElementById("FechaInicio").value = document.getElementById("FechaFin").value;*/
        } catch (e) { mens("Error en fechas", "error"); }
    },
    afterShow: function () { },
    inicializa: function () {
    },
    datos: [],
    listViewGCClick: function (e) {
        try {
            //var servicioRA = JSON.stringify(e.dataItem);
            registroGC = JSON.stringify(e.dataItem);
            //sessionStorage.setItem("servicioRA", servicioRA);
            //window.location = "index.html#components/DetalleServicio/detalleservicio.html";
            kendo.mobile.application.navigate("components/ReporteGeocerca/view.html");
        } catch (s) {
            mens("Error selección de registroGC");
        }
    }
});
app.localization.registerView('reporteGeocercas');
function regresaGC() {
    registroGC = "";
    registroGC1 = "";
    $("#listViewGC").kendoGrid().dataSource = "";
    kendo.mobile.application.navigate("components/MenuAlertas/view.html");
}

function traeCordenadasUbicaGC() {
    try {
        var cords = [];
        var cords1 = [];
        var data1;
        var FechaRecGC = document.getElementById("FechaInicioGC").value;
        var FechaRecGC1 = document.getElementById("FechaFinGC").value;;
        var ordenUsuario = datos_Vehiculo.numeroorden; //sessionStorage.getItem("Orden");
        var Url = "http://190.110.193.131/ReportService.svc/ReporteGeoCercas/" + FechaRecGC + "/" + FechaRecGC1 + "?" + ordenUsuario;
        var params = {
            orden: ordenUsuario,
            output: "json"
        };
        $.ajax({
            url: Url,
            type: "GET",
            data: params,
            dataType: "json",
            async: false,
            success: function (data) {
                try {
                    data = data.ReporteGeoCercasResult.lstGeocercas;
                    var data1 = data[0].lstGeoRegistrada;
                    for (var j = 0; j < data1.length; j++) {
                        if (data1[j] != null) {
                            cords1.push({
                                numGeocerca: data1[j].numGeocerca,
                                lstCoordenadas: data1[j].lstCoordenadas
                            });
                        }
                    }
                    registroGC1 = cords1;
                    for (var i = 0; i < data[0].lstPuntosGeo.length; i++) {
                        if (data[0].lstPuntosGeo[i] != null) {
                            cords.push({
                                Fecha: data[0].lstPuntosGeo[i].Fecha,
                                lstCoordGeo: data[0].lstPuntosGeo[i].lstCoordGeo
                                //Latitud: data[i].Latitud,
                                //Longitud: data[i].Longitud,
                                //Velocidad: data[i].Velocidad,
                                //Sentido: data[i].Sentido,
                                //FecharegistroPA: data[i].FecharegistroPA,
                                //Estado: data[i].Estado
                            });
                        }
                    }
                } catch (e) {
                    mens("Error coordenadas servicio sherloc", "error");
                }
            },
            error: function (err) {
                mens("Error servicio sherloc", "error");
            }
        });
        /*FechaUbicacion
            Latitud
            Longitud
            Kilometraje*/
        var fechaU = (screen.width * 20) / 100;
        var Lati = (screen.width * 30) / 100;
        var Kilo = (screen.width * 20) / 100;
        $("#listViewGC").kendoGrid({
            allowCopy: true,
            columns: [
                { field: "Fecha", title: "Fecha", width: fechaU }
                //,{ field: "Latitud", title: "Latitud", width: Lati },
                //{ field: "Longitud", title: "Logitud", width: Lati },
                //{ field: "Velocidad", title: "Velocidad", width: Kilo }
            ],
            dataSource: cords,
            selectable: "row",
            change: function (e) {
                var selectedRows = this.select();
                var selectedDataItems = [];
                for (var i = 0; i < selectedRows.length; i++) {
                    var dataItem = this.dataItem(selectedRows[i]);
                    selectedDataItems.push(dataItem);
                }
                registroGC = selectedDataItems[0];
                //alert(inspeccionar(registroPA.lstAlarmas));
                kendo.mobile.application.navigate("components/ReporteGeocerca/view.html");
            }
        });
    } catch (d) {
        mens("Error en servicio sherloc", "error");
    }
}
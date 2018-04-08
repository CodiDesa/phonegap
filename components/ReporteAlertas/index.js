var registro;
app.reporteAlertas = kendo.observable({
    onShow: function () {
        try { 
            $("#NoOrdenEX").text(datos_Vehiculo.numeroorden); 
            registro = "";
            var wd = (screen.width / 2) - 30;
            var wx = wd - 15;
            document.getElementById("FechaInicioRA").style.width = wd + "px";
            document.getElementById("FechaFinRA").style.width = wd + "px";
            var fecha = new Date();
            var year = fecha.getFullYear();
            var mes = fecha.getMonth();
            var dia = fecha.getDate();

            $("#FechaInicioRA").kendoDatePicker({
                ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#",
                min: new Date(1900, 0, 1),
                value: new Date(),
                format: "dd-MM-yyyy",
                max: new Date(year, mes, dia)
            });
            $("#FechaFinRA").kendoDatePicker({
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
    listViewRAClick: function (e) {
        try {
            //var servicioRA = JSON.stringify(e.dataItem);
            registro = JSON.stringify(e.dataItem);
            //sessionStorage.setItem("servicioRA", servicioRA);
            //window.location = "index.html#components/DetalleServicio/detalleservicio.html";
            kendo.mobile.application.navigate("components/ReporteExceso/view.html");
        } catch (s) {
            mens("Error selección de registro");
        }
    }
});
app.localization.registerView('reporteAlertas');
function regresaE(){
    registro = "";
    $("#listViewRA").kendoGrid().dataSource = "";
    kendo.mobile.application.navigate("components/MenuAlertas/view.html");
}

function traeCordenadasUbicaRA() {
    var reporte;
    try {
        var cords = [];
        var FechaRecEX = document.getElementById("FechaInicioRA").value;
        var FechaRecEX1 = document.getElementById("FechaFinRA").value;;
        var ordenUsuario = datos_Vehiculo.numeroorden; //sessionStorage.getItem("Orden");
        if (tipoReporte == "E") {
            var Url = "http://190.110.193.131/ReportService.svc/ReporteExVelocidad/" + FechaRecEX + "/" + FechaRecEX1 + "?" + ordenUsuario;
        }
        if (tipoReporte == "P") {
            var Url = "http://190.110.193.131/ReportService.svc/ReporteEventoPanico/" + FechaRecEX + "/" + FechaRecEX1 + "?" + ordenUsuario;
        }
        if (tipoReporte == "G") {
            var Url = "http://190.110.193.131/ReportService.svc/ReporteEventoPanico/" + FechaRecEX + "/" + FechaRecEX1 + "?" + ordenUsuario;
        }
        if (tipoReporte == "S") {
            var Url = "http://190.110.193.131/ReportService.svc/ReporteParadas/" + FechaRecEX + "/" + FechaRecEX1 + "?" + ordenUsuario;
        }
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
                    if (tipoReporte == "E") { data = data.ReporteExVelocidadResult.lstReporteAlarmas; }
                    if (tipoReporte == "P") { data = data.ReporteEventoPanicoResult.lstReporteAlarmas; }
                    if (tipoReporte == "G") { data = data.ReporteEventoPanicoResult.lstReporteAlarmas; }
                    if (tipoReporte == "S") { data = data.ReporteParadasResult.lstReporteAlarmas; }
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].lstAlarmas != null) {
                            cords.push({
                                Fecha: data[i].Fecha,
                                lstAlarmas: data[i].lstAlarmas
                                //Latitud: data[i].Latitud,
                                //Longitud: data[i].Longitud,
                                //Velocidad: data[i].Velocidad,
                                //Sentido: data[i].Sentido,
                                //FechaRegistro: data[i].FechaRegistro,
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
        $("#listViewRA").kendoGrid({
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
                //alert(inspeccionar(selectedDataItems[0].lstAlarmas));
                registro = selectedDataItems[0];
                //alert(inspeccionar(registro.lstAlarmas));
                kendo.mobile.application.navigate("components/ReporteExceso/view.html");
            }
        });
    } catch (d) {
        mens("Error en servicio sherloc", "error");
    }
}
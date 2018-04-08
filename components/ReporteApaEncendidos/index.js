var registroAE;
app.reporteApaEnces = kendo.observable({
    onShow: function () {
        try {
            $("#NoOrdenAE").text(datos_Vehiculo.numeroorden);
            registroAE = "";
            var wd = (screen.width / 2) - 30;
            var wx = wd - 15;
            document.getElementById("FechaInicioAE").style.width = wd + "px";
            document.getElementById("FechaFinAE").style.width = wd + "px";
            var fecha = new Date();
            var year = fecha.getFullYear();
            var mes = fecha.getMonth();
            var dia = fecha.getDate();

            $("#FechaInicioAE").kendoDatePicker({
                ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#",
                min: new Date(1900, 0, 1),
                value: new Date(),
                format: "dd-MM-yyyy",
                max: new Date(year, mes, dia)
            });
            $("#FechaFinAE").kendoDatePicker({
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
    inicializa: function () { },
    datos: [],
    listViewAEClick: function (e) {
        try {
            //var servicioRA = JSON.stringify(e.dataItem);
            registroAE = JSON.stringify(e.dataItem);
            //sessionStorage.setItem("servicioRA", servicioRA);
            //window.location = "index.html#components/DetalleServicio/detalleservicio.html";
            kendo.mobile.application.navigate("components/ReporteApaEncendido/view.html");
        } catch (s) {
            mens("Error selección de registroAE");
        }
    }
});
app.localization.registerView('reporteApaEnces');
function regresaAE() {
    registroAE = "";
    $("#listViewAE").kendoGrid().dataSource = "";
    kendo.mobile.application.navigate("components/MenuAlertas/view.html");
}

function traeCordenadasUbicaAE() {
    try {
        var cords = [];
        var FechaRecAE = document.getElementById("FechaInicioAE").value;
        var FechaRecAE1 = document.getElementById("FechaFinAE").value;;
        var ordenUsuario = datos_Vehiculo.numeroorden; //sessionStorage.getItem("Orden");
        var Url = "http://190.110.193.131/ReportService.svc/ReporteApagadoEncendido/" + FechaRecAE + "/" + FechaRecAE1 + "?" + ordenUsuario;
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
                    data = data.ReporteApagadoEncendidoResult.lstReporteAlarmas;
                    alert(inspeccionar(data));
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] != null) {
                            cords.push({
                                Fecha: data[i].Fecha,
                                TotalRecorrido: data[i].TotalRecorrido,
                                TotalTiempoEncendido: data[i].TotalTiempoEncendido,
                                lstRecorridos: data[i].lstRecorridos
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
        var fechaU = (screen.width * 30) / 100;
        var Lati = (screen.width * 35) / 100;
        var Kilo = (screen.width * 20) / 100;
        $("#listViewAE").kendoGrid({
            allowCopy: true,
            columns: [
                { field: "Fecha", title: "Fecha", width: fechaU },
                { field: "TotalRecorrido", title: "Total Recorrido", width: Lati },
                { field: "TotalTiempoEncendido", title: "Total Encendido", width: Lati }
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
                registroAE = selectedDataItems[0];
                //alert(inspeccionar(registroPA.lstAlarmas));
                kendo.mobile.application.navigate("components/ReporteApaEncendido/view.html");
            }
        });
    } catch (d) {
        mens("Error en servicio sherloc", "error");
    }
}
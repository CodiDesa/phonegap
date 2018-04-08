app.menuAlertas = kendo.observable({
    init: function () { },
    onShow: function () {
        $("#NoOrdenAL").text(datos_Vehiculo.numeroorden);
    },
    afterShow: function () { }
});
app.localization.registerView('menuAlertas');
var tipoReporte = "";
function excesos() {
    tipoReporte = "E";
    kendo.mobile.application.navigate("components/ReporteAlertas/view.html");
}

function panico() {
    tipoReporte = "P";
    kendo.mobile.application.navigate("components/ReportePanicos/view.html");
}

function geocercas() {
    kendo.mobile.application.navigate("components/ReporteGeocercas/view.html");
}

function apaencendido() {
    kendo.mobile.application.navigate("components/ReporteApaEncendidos/view.html");
}

function paradas() {
    tipoReporte = "S";
    kendo.mobile.application.navigate("components/ReporteParadas/view.html");
}
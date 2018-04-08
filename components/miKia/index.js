//'use strict';

app.miKia = kendo.observable({
    init: function () { },
    onShow: function () {
        $("#NumeroChasis").text(datos_Cliente.chasis);
        var Registro = sessionStorage.getItem("Registro");
    },
    afterShow: function () { }
});
app.localization.registerView('miKia');

function logout() {
    navigator.app.exitApp();
}

function AdmVehiculos() {
    kendo.mobile.application.navigate("components/MantenimientoVehiculos/view.html");
}

function AgregarVin() {
    kendo.mobile.application.navigate("components/AgregarVin/view.html");
}

function HistorialVin() {
    kendo.mobile.application.navigate("components/OrdenesTrabajo/view.html");
    //kendo.mobile.application.navigate("components/HistorialVin/view.html");
}

function OrdenTrabajo() {
    kendo.mobile.application.navigate("components/HistorialVin/view.html");
}

function estadoMan() {
    kendo.mobile.application.navigate("components/EstadoMantenimiento/view.html");
}
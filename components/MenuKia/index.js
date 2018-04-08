app.menuKia = kendo.observable({
    init: function () { },
    onShow: function () {
        $("#NumeroChasisMenu").text(datos_Cliente.chasis);
        var Registro = sessionStorage.getItem("Registro");
    },
    afterShow: function () { }
});
app.localization.registerView('menuKia');
var data1;
function logoutMenu() {
    navigator.app.exitApp();
}
function ConfigurarSherlock() {
    try {
        var Url = "http://190.110.193.131/ClienteService.svc/ClientProfile/" + datos_Cliente.chasis + "/R/" + datos_Cliente.identificacion_cliente + "/1234567890/" + datos_Cliente.telefono_celular;
        $.ajax({
            url: Url, type: "GET", dataType: "json", async: false,
            success: function (data) {
                data1 = data.perfilClienteResult;
            },
            error: function (err) {
                mens("Error servicio Sherloc", "error")
                //kendo.ui.progress($("#miKia2Screen"), false);
            }
        });
    } catch (e) { mens("Error servicio Sherloc") }
    if(data1.orden == 0){mens("Cliente no tiene servicio","warning");return;}
    if (data1.tipoContrato == "GOLDEN") {
        kendo.mobile.application.navigate("components/OrdenInstalacion/view.html");
    } else { kendo.mobile.application.navigate("components/OrdenInstalacionBasico/view.html"); }
}

function servicioKia() {
    kendo.mobile.application.navigate("components/miKia/view.html");
}

function compraKia() {
    kendo.mobile.application.navigate("components/AgendarCita/view.html");
}
/*
function AdmVehiculos() {
    kendo.mobile.application.navigate("components/MantenimientoVehiculos/view.html");
}

function OrdenTrabajo() {
    kendo.mobile.application.navigate("components/HistorialVin/view.html");
}

function AgregarVin() {
    kendo.mobile.application.navigate("components/AgregarVin/view.html");
}

function HistorialVin() {
    kendo.mobile.application.navigate("components/OrdenesTrabajo/view.html");
    //kendo.mobile.application.navigate("components/HistorialVin/view.html");
}

function agendarCitas() {
    kendo.mobile.application.navigate("components/AgendarCita/view.html");
}

function LocalizarKia() {
    kendo.mobile.application.navigate("components/Ubicacion/view.html");
    //kendo.mobile.application.navigate("components/LocalizarAuto/view.html");
}

function ControlarKia() {
    kendo.mobile.application.navigate("components/ControlarAuto/view.html");
}*/

//'use strict';
var FechaRec;
app.fechaReco = kendo.observable({
    onShow: function () {
        try {
            $("#NoOrdenRA").text(datos_Vehiculo.numeroorden);
            document.getElementById("FechaRecor").style.fontSize = "large";
            document.getElementById("myLabel").style.fontSize = "large";
            document.getElementById("btnConsultarFecha").style.fontSize = "large";
            FechaRec = new Date();
            var fecha = new Date();
            var year = fecha.getFullYear();
            var mes = fecha.getMonth();
            var dia = fecha.getDate();

            $("#FechaRecor").kendoDatePicker({
                ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#",
                min: new Date(year, (mes - 2), dia),
                value: new Date(),
                format: "dd-MM-yyyy",
                max: new Date(year, mes, dia)
            });
        } catch (e) { mens("Error en la fecha", "error"); }
    },
    afterShow: function () { },
    inicializa: function () { },

});
app.localization.registerView('fechaReco');

function Consultar() {
    if (document.getElementById("FechaRecor").value == "" || !document.getElementById("FechaRecor").value) { alert("Fecha inicio no ha sido seleccionada"); return; }
    FechaRec = document.getElementById("FechaRecor").value;
    kendo.mobile.application.navigate("components/ControlarAuto/view.html");
}

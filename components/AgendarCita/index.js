'use strict';

app.mntAgendarCita = kendo.observable({
    onShow: function () {
        $("#NumeroChasisCA").text(datos_Cliente.chasis);
        var anch = screen.width;
        var height1 = (anch / 2) - 30;
        document.getElementById("autokia1").style.width  = height1 + "px";
        document.getElementById("autokia2").style.width  = height1 + "px";
        document.getElementById("autokia3").style.width  = height1 + "px";
        document.getElementById("autokia4").style.width  = height1 + "px";
        document.getElementById("autokia5").style.width  = height1 + "px";
        document.getElementById("autokia6").style.width  = height1 + "px";
        document.getElementById("autokia7").style.width  = height1 + "px";
        document.getElementById("autokia8").style.width  = height1 + "px";
        document.getElementById("autokia9").style.width  = height1 + "px";
        document.getElementById("autokia10").style.width  = height1 + "px";
        document.getElementById("autokia11").style.width  = height1 + "px";
        document.getElementById("autokia12").style.width  = height1 + "px";
        document.getElementById("autokia13").style.width  = height1 + "px";
        document.getElementById("autokia14").style.width  = height1 + "px";
        document.getElementById("autokia15").style.width  = height1 + "px";
    },
    afterShow: function () { },
    inicializa: function () {

    }
});
app.localization.registerView('mntAgendarCita');


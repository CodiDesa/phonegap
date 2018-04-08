app.estadoMante = kendo.observable({
    onShow: function () {
        $("#NumeroChasisEM").text(datos_Cliente.chasis);
        borrar();
        cargar();
    },
    afterShow: function () { },
    inicializa: function () {

    }
});
app.localization.registerView('estadoMante');
function cargar() {
    try {
        var usu = localStorage.getItem("Inp_DatosUsuario");
        var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/Mantenimiento/" + "2," + datos_Cliente.chasis;
        var inforEM;
        $.ajax({
            url: Url,
            type: "GET",
            async: false,
            dataType: "json",
            success: function (data) {
                try {
                    inforEM = (JSON.parse(data.MantenimientoGetResult)).KilometrajeOT;
                } catch (e) {
                    mens("No existe datos para esta cosnulta", "error");
                }
            },
            error: function (err) {
                mens("Error en consulta OT", "error");
            }
        });
        var bandera = "verde";
        for (var i = 0; i < 30; i++) {
            if (inforEM[i].validacion == true) {
                document.getElementById("cl" + inforEM[i].codigo).style.background = "green";
                document.getElementById("cx" + inforEM[i].codigo + "v").style.display = "";
            }
            else {
                document.getElementById("cl" + inforEM[i].codigo).style.background = "red";
                document.getElementById("cx" + inforEM[i].codigo + "x").style.display = "";
                bandera = "rojo";
            }
            if (inforEM[i].ultimo == true) {
                //alert(inforEM[i].fecha_kilometraje);
                //alert(inforEM[i].kilometraje);
                document.getElementById(bandera).style.display = "";
                document.getElementById("fec").value = inforEM[i].fecha_kilometraje;
                document.getElementById("KM").value = inforEM[i].kilometraje;
                i = 30;
            }
        }
    } catch (e) {
        mens("Error de conexión a la base");
    }
}

function borrar() {
    document.getElementById("fec").value = "";
    document.getElementById("KM").value = "";
    document.getElementById("cl5000").style.background = "";
    document.getElementById("cx5000v").style.display = 'none';
    document.getElementById("cx5000x").style.display = 'none';

    document.getElementById("cl10000").style.background = "";
    document.getElementById("cx10000v").style.display = 'none';
    document.getElementById("cx10000x").style.display = 'none';

    document.getElementById("cl15000").style.background = "";
    document.getElementById("cx15000v").style.display = 'none';
    document.getElementById("cx15000x").style.display = 'none';

    document.getElementById("cl20000").style.background = "";
    document.getElementById("cx20000v").style.display = 'none';
    document.getElementById("cx20000x").style.display = 'none';

    document.getElementById("cl25000").style.background = "";
    document.getElementById("cx25000v").style.display = 'none';
    document.getElementById("cx25000x").style.display = 'none';

    document.getElementById("cl30000").style.background = "";
    document.getElementById("cx30000v").style.display = 'none';
    document.getElementById("cx30000x").style.display = 'none';

    document.getElementById("cl35000").style.background = "";
    document.getElementById("cx35000v").style.display = 'none';
    document.getElementById("cx35000x").style.display = 'none';

    document.getElementById("cl40000").style.background = "";
    document.getElementById("cx40000v").style.display = 'none';
    document.getElementById("cx40000x").style.display = 'none';

    document.getElementById("cl45000").style.background = "";
    document.getElementById("cx45000v").style.display = 'none';
    document.getElementById("cx45000x").style.display = 'none';

    document.getElementById("cl50000").style.background = "";
    document.getElementById("cx50000v").style.display = 'none';
    document.getElementById("cx50000x").style.display = 'none';

    document.getElementById("cl55000").style.background = "";
    document.getElementById("cx55000v").style.display = 'none';
    document.getElementById("cx55000x").style.display = 'none';

    document.getElementById("cl60000").style.background = "";
    document.getElementById("cx60000v").style.display = 'none';
    document.getElementById("cx60000x").style.display = 'none';

    document.getElementById("cl65000").style.background = "";
    document.getElementById("cx65000v").style.display = 'none';
    document.getElementById("cx65000x").style.display = 'none';

    document.getElementById("cl70000").style.background = "";
    document.getElementById("cx70000v").style.display = 'none';
    document.getElementById("cx70000x").style.display = 'none';

    document.getElementById("cl75000").style.background = "";
    document.getElementById("cx75000v").style.display = 'none';
    document.getElementById("cx75000x").style.display = 'none';

    document.getElementById("cl80000").style.background = "";
    document.getElementById("cx80000v").style.display = 'none';
    document.getElementById("cx80000x").style.display = 'none';

    document.getElementById("cl85000").style.background = "";
    document.getElementById("cx85000v").style.display = 'none';
    document.getElementById("cx85000x").style.display = 'none';

    document.getElementById("cl90000").style.background = "";
    document.getElementById("cx90000v").style.display = 'none';
    document.getElementById("cx90000x").style.display = 'none';

    document.getElementById("cl95000").style.background = "";
    document.getElementById("cx95000v").style.display = 'none';
    document.getElementById("cx95000x").style.display = 'none';

    document.getElementById("cl100000").style.background = "";
    document.getElementById("cx100000v").style.display = 'none';
    document.getElementById("cx100000x").style.display = 'none';

    document.getElementById("cl105000").style.background = "";
    document.getElementById("cx105000v").style.display = 'none';
    document.getElementById("cx105000x").style.display = 'none';

    document.getElementById("cl110000").style.background = "";
    document.getElementById("cx110000v").style.display = 'none';
    document.getElementById("cx110000x").style.display = 'none';

    document.getElementById("cl115000").style.background = "";
    document.getElementById("cx115000v").style.display = 'none';
    document.getElementById("cx115000x").style.display = 'none';

    document.getElementById("cl120000").style.background = "";
    document.getElementById("cx120000v").style.display = 'none';
    document.getElementById("cx120000x").style.display = 'none';

    document.getElementById("cl125000").style.background = "";
    document.getElementById("cx125000v").style.display = 'none';
    document.getElementById("cx125000x").style.display = 'none';

    document.getElementById("cl130000").style.background = "";
    document.getElementById("cx130000v").style.display = 'none';
    document.getElementById("cx130000x").style.display = 'none';

    document.getElementById("cl135000").style.background = "";
    document.getElementById("cx135000v").style.display = 'none';
    document.getElementById("cx135000x").style.display = 'none';

    document.getElementById("cl140000").style.background = "";
    document.getElementById("cx140000v").style.display = 'none';
    document.getElementById("cx140000x").style.display = 'none';

    document.getElementById("cl145000").style.background = "";
    document.getElementById("cx145000v").style.display = 'none';
    document.getElementById("cx145000x").style.display = 'none';

    document.getElementById("cl150000").style.background = "";
    document.getElementById("cx150000v").style.display = 'none';
    document.getElementById("cx150000x").style.display = 'none';    
}
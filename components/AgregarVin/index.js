//'use strict';
//document.getElementById('mymodal_cargar').style.display = "block";
app.mntRegistroVin = kendo.observable({ 
    onShow: function () {
        //kendo.ui.progress($("#btnPDF"), true);
        $("#NumeroChasisPF").text(datos_Cliente.chasis);
        var alto = screen.height - 130;
        var ancho = screen.width - 10;
        var todo = document.getElementById("ifmPrefactura");
        document.getElementById("ifmPrefactura").style.width = ancho+"px";
        document.getElementById("ifmPrefactura").style.height = alto+"px";
        //alert (inspeccionar(todo));
    },
    afterShow: function () {
        //kendo.ui.progress($("#btnPDF"), false); 
        },
    inicializa: function () { }
});
app.localization.registerView('mntRegistroVin');

//document.getElementById('mymodal_cargar').style.display = "none";


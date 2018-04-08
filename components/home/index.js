//'use strict';

app.home = kendo.observable({
    onShow1: function () {
        try {
            Device_identifier = device.uuid;
            try {
                var verific = validaLoginPrueba();
                if (verific == false) {
                    urlService = urlInterno;
                } else { urlService = urlExterno; }
                localStorage.setItem("urlService", urlService);
            } catch (e) { mens("No existe conexión con el servidor ","error"); }

            /*var confIp = localStorage.getItem("urlService");
            var switchInstance = $("#switch").data("kendoMobileSwitch");
            if (confIp == urlInterno) {
                switchInstance.check(true);
            }
            else {
                switchInstance.check(false);
            }*/
        } catch (e) { mens("Error lectura ip", "error"); }
        try {
            //configIps();
            if (localStorage.getItem("Inp_DatosUsuario")) {
                //datos_Cliente = localStorage.getItem("Inp_DatosUsuario");
                datos_Cliente = JSON.parse(localStorage.getItem("Inp_DatosUsuario"));
                //datos_Vehiculo = localStorage.getItem("Inp_DatosVehiculo");
                datos_Vehiculo = JSON.parse(localStorage.getItem("Inp_DatosVehiculo"));
                //kendo.mobile.application.navigate("components/miKia/view.html");
                kendo.mobile.application.navigate("components/MenuKia/view.html");
                //alert(inspeccionar(datos_Vehiculo));
                //alert(inspeccionar(datos_Cliente));
            }
        } catch (f) { mens("Error en conexión a la base", "error"); }
    },
    afterShow: function () { }
});
app.localization.registerView('home');

(function (parent) {
    //var
        //processImage = function (img) {
         //   if (!img) {
          //      var empty1x1png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=';
          //      img = 'data:image/png;base64,' + empty1x1png;
          //  }
          //  return img;
        //},

        homeModel = kendo.observable({
            /// start add model functions
            ingresar: function () {
                try {
                    //configIps();
                    kendo.mobile.application.navigate("components/logIn/view.html");
                } catch (s) { mens("Error en conexión", "error"); }
            },
            registro: function () {
                try {
                    //configIps();
                    kendo.mobile.application.navigate("components/Registro/view.html");
                } catch (s) { mens("Error en conexión", "error"); }
            }
        });

    parent.set('onShow', function _onShow() {
        var that = parent;
        that.set('addFormData', {
            /// start add form data init
            /// end add form data init
        });
        /// start add form show
        /// end add form show
    });
    parent.set('homeModel', homeModel);
})(app.home);

function configIps() {
    // get a reference to the switch widget
    var switchInstance = $("#switch").data("kendoMobileSwitch");
    if (switchInstance.check()) {
        urlService = urlInterno;
    }
    else {
        urlService = urlExterno;
    }
    localStorage.setItem("urlService", urlService);
}

//190.108.66.10
function validaLoginPrueba() {
    var Url = "http://190.108.66.10:8089" + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/Login/s@s.com;a";
    $.ajax({
        url: Url,
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data) {
            resultado = data.LoginGetResult;
        },
        error: function (err) {
            if (err.statusText.substr(0, 31) == "NetworkError: Failed to execute") {
                resultado = false;
                return resultado;
            }
        }
    });
    return resultado;
}
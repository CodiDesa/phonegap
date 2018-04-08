'use strict';

app.miKia5 = kendo.observable({
    onShow: function () { document.getElementById("recuperar_email").focus();},
    afterShow: function () { }
});
app.localization.registerView('miKia5');

function enviarMail() {
    var _mail = document.getElementById("recuperar_email").value;

    if ((_mail) && (_mail != "")) {
        try {
            if (document.getElementById("recuperar_email").value != "") {
                var result = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(document.getElementById("recuperar_email").value);

                if (result == false) {
                    document.getElementById("recuperar_email").focus();
                    document.getElementById("recuperar_email").style.borderColor = "red";
                } else {
                    document.getElementById("recuperar_email").style.borderColor = "";
                    mens("Su contraseña fue enviada al su correo","success");
                    document.getElementById("recuperar_email").value = "";
                    kendo.mobile.application.navigate("components/logIn/view.html");
                }
            }
        } catch (f) { mens("Error validacion mail","error"); }
    }
}

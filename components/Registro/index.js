//'use strict';
var persona_numero = "0";
app.miKia6 = kendo.observable({
    onShow: function () {
        try {
            //document.getElementById("numorden").value = 0;
            var fecha = new Date();
            var year = fecha.getFullYear() - 18;
            var mes = fecha.getMonth();
            var dia = fecha.getDate();
            $("#FechaNacimiento").kendoDatePicker({
                ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#",
                min: new Date(1900, 0, 1),
                max: new Date(year, (mes + 1), dia),
                format: "yyyy-MM-dd"
            });
            document.getElementById("btnRegistrar").disabled = true;
            document.getElementById("FechaNacimiento").value = (year + "-" + (mes + 1) + "-" + dia);
        } catch (e) { mens("Error en formato fecha", "error"); }
    },
    afterShow: function () { }
});
app.localization.registerView('miKia6');

function personaGet() {
    try {
        var _identificacion = document.getElementById("identificacion").value;
        if ((_identificacion != "") && (_identificacion)) {
            var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/json/" + _identificacion;
            $.ajax({
                url: Url,
                type: "GET",
                async: false,
                dataType: "json",
                success: function (data) {
                    try {
                        data = JSON.parse(data.PersonaGetResult);
                        if (data.persona_nombre) {
                            document.getElementById("Nombres").value = data.persona_nombre;
                            document.getElementById("Apellidos").value = data.persona_apellido;
                            document.getElementById("email").value = data.mail;
                            document.getElementById("FechaNacimiento").value = data.fecha_nacimiento;
                            document.getElementById("celular").value = data.telefono_celular;
                            persona_numero = data.persona_numero;
                        } else {
                            mens("Error no existe persona", "error");
                            borraCampos();
                        }
                    } catch (e) {
                        mens("Error consulta cliente", "error");
                        borraCampos();
                    }
                },
                error: function (err) {
                    mens("Error conexión servicio clientes", "error");
                }
            });
        }
    } catch (e) {
        mens("Error servicio clientes", "error");
    }
}


function registrar() {
    try {
        var identificacion = document.getElementById("identificacion").value;
        var Nombres = document.getElementById("Nombres").value;
        var Apellidos = document.getElementById("Apellidos").value;
        var email = document.getElementById("email").value;
        var chasis = document.getElementById("Chasis").value;
        var FechaNacimiento = document.getElementById("FechaNacimiento").value;
        var celular = document.getElementById("celular").value;
        var password = document.getElementById("password").value;
        var repassword = document.getElementById("repassword").value;
        var numorden = 0; //document.getElementById("numorden").value;
        var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/ClienteSet";
        var params = {
            "secuencia_mv01": 3,
            "identificacion_cliente": identificacion,
            "persona_nombre": Nombres,
            "persona_apellido": Apellidos,
            "mail": email,
            "chasis": chasis,
            "fecha_nacimiento": FechaNacimiento,
            "telefono_celular": celular,
            //"numeroorden": numorden,
            "password": password,
            "persona_numero": persona_numero
            //"alta_movil_imei": Device_identifier
            //output: "json"
        };
        var indicador = 0;
        $.each(params, function (k, v) {
            //display the key and value pair
            if (v == "") {
                indicador = 1;
                //alert(k + ' esta en blanco ' + v);
            }
        });
        if (indicador == 1) {
            alert("Verificar datos en blanco"); return;
        }
        $.ajax({
            url: Url,
            type: "POST",
            data: JSON.stringify(params),
            async: false,
            dataType: "json",
            //Content-Type: application/json
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            success: function (data) {
                //alert(data);
                if (data == "Success") {
                    try {
                        mens("Registro Exitoso", "success");
                        sessionStorage.setItem("Registro", params);
                        var em = params.mail;
                        var usu = validausuario(em); //resultado.Cliente[0].persona_nombre
                        var tipo = "";
                        if (usu.Cliente[0].identificacion_cliente.length == 10) { tipo = "C"; }
                        else {
                            if (usu.Cliente[0].identificacion_cliente.length == 13) { tipo = "R"; }
                            else { tipo = "P"; }
                        }
                        var Usuario = {
                            chasis: usu.Cliente[0].chasis,//"8LGJE5520CE010039",
                            identificacion_cliente: usu.Cliente[0].identificacion_cliente,  //"0992327685001",
                            tipodocumento: tipo, //"R",
                            uid: "1234567890", // usu.Cliente[0].alta_movil_imei,
                            telefono_celular: usu.Cliente[0].telefono_celular, //"0995545554",
                            //numeroorden: "72363",
                            secuencia_mv01: usu.Cliente[0].secuencia_mv01,
                            mail: usu.Cliente[0].mail
                        };
                        localStorage.setItem("Inp_DatosUsuario", JSON.stringify(Usuario));
                        datos_Cliente = Usuario;
                        var veh = validavehicu(em);
                        if (veh == "" || veh == null || !(veh)) { mens("Registre autos", "warning"); }
                        else {
                            veh = veh.Vehiculo[0];
                            var Vehiculo = {
                                secuencia_mv01: veh.secuencia_mv01, //6,
                                mail: veh.mail, //"nerycarmela@hotmail.com",
                                chasis: veh.chasis, //"19JJDSXSMLSLXS",
                                numeroorden: veh.numeroorden,
                                contrato_tipo: veh.contrato_tipo, //"",
                                contrato_estado: veh.contrato_estado, //false,
                                contrato_fecha_desde: veh.contrato_fecha_desde, //"1900-01-01",
                                contrato_fecha_hasta: veh.contrato_fecha_hasta, //"1900-01-01",
                                estado_vh02: veh.estado_vh02, //false,
                                alta_movil_imei: veh.alta_movil_imei, // "",
                                alta_movil_ip: veh.alta_movil_ip // ""
                            }
                            localStorage.setItem("Inp_DatosVehiculo", JSON.stringify(Vehiculo));
                            datos_Vehiculo = Vehiculo;
                        }
                        //kendo.mobile.application.navigate("components/miKia/view.html");
                        kendo.mobile.application.navigate("components/MenuKia/view.html");
                        return;
                    } catch (s) {  mens("Error servicio cliente", "error");} //alert (s); 
                }
                else { mens(data, "error"); }
            },
            error: function (err) { mens("Error en servicio clientes", "error"); } //alert(err);
        });
    } catch (e) {mens("Error en el servicio clientes", "error"); } //aler(e);
}

function ValidaMailRegistro() {
    try {
        if (document.getElementById("email").value != "") {
            var result = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(document.getElementById("email").value);

            if (result == false) {
                document.getElementById("email").focus();
                document.getElementById("email").style.borderColor = "red";
            } else {
                document.getElementById("email").style.borderColor = "";
            }
        }
    } catch (f) { mens("Error validación mail", "error"); }
}
function ValidaCelular() {
    try {
        if (document.getElementById("celular").value != "") {
            var result = /[09][0-9]{9}$/.test(document.getElementById("celular").value);
            if (result == false) {
                document.getElementById("celular").focus();
                document.getElementById("celular").style.borderColor = "red";
            } else {
                document.getElementById("celular").style.borderColor = "";
            }
        }
    }
    catch (f) { mens("Error validación celular","error"); }
}
function ValidaPassword() {
    var pass = document.getElementById("password").value;
    var repass = document.getElementById("repassword").value;
    if (pass == repass) {
        document.getElementById("btnRegistrar").disabled = false;
        document.getElementById("repassword").style.borderColor = "";
    }
    else {
        document.getElementById("btnRegistrar").disabled = true;
        document.getElementById("repassword").style.borderColor = "red";
    }
}

function borraCampos() {
    document.getElementById("Nombres").value = "";
    document.getElementById("Apellidos").value = "";
    document.getElementById("email").value = "";
    document.getElementById("FechaNacimiento").value = "";
    document.getElementById("celular").value = "";
}
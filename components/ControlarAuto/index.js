//'use strict';
var directionsDisplay;
var directionsService;
var map2, geocoder;
app.mntControlVehiculo = kendo.observable({
    onShow: function () {
        try {
            var mensa = "Fecha: " + FechaRec;
            $("#recorrido").text(mensa);
            //Calculo el % a restar al alto total de la pantalla para que el mapa se ajuste correctamente al 100%
            var height = (screen.height * 25.46875) / 100;
            var height1 = screen.height - height; //resto el valor en px que corresponde al % que sobra 
            document.getElementById("mapA").style.height = height1 + "px";
            var cords = traeCordenadas();
            var len = cords.length - 1;
            if (!cords || len == -1) { mens("No existe datos"); return; }
            var latuno = parseFloat(cords[0].Latitud);
            var lnguno = parseFloat(cords[0].Longitud);
            var latfin = parseFloat(cords[len].Latitud);
            var lngfin = parseFloat(cords[len].Longitud);
            var latlng = [];
            var PosVehi = { lat: latuno, lng: lnguno };
            directionsDisplay = new google.maps.DirectionsRenderer;
            directionsService = new google.maps.DirectionsService;
            map2 = new google.maps.Map(document.getElementById('mapA'), {
                zoom: 16,
                center: PosVehi
            });

            directionsDisplay.setMap(map2);
            geocoder = new google.maps.Geocoder;
            var factor = 0;
            if (len > 9) { factor = Math.trunc((len-2) / 8); }
            
            var bandera = 1;
            /*for (var n = len; n < len - 9; n--) {
                latlng.push({
                    location: parseFloat(cords[n].Latitud) + "," + parseFloat(cords[n].Longitud),
                    stopover: true
                })*/
            for (var n = factor; n < len; n++ ) {
               latlng.push({
                    location: parseFloat(cords[n].Latitud) + "," + parseFloat(cords[n].Longitud),
                    stopover: true
                })
                n = n + factor;
            }
            
            calculateAndDisplayRoute2(directionsService, directionsDisplay, latuno, lnguno, latlng, latfin, lngfin);
        } catch (f) {
            mens("Error en servicio Sherloc", "error");
        }
    },
    afterShow: function () { },
    inicializa: function () {

    }
});
app.localization.registerView('mntControlVehiculo');

function traeCordenadas() {
    try {
        var cords;
        var ordenUsuario = datos_Vehiculo.numeroorden; //sessionStorage.getItem("Orden");
        //var Url = "http://190.110.193.131/ServiceERM.svc/Historico/04-04-2017/05-04-2017?" + ordenUsuario; + fecha + "/" + fecha + "?"
        var Url = "http://190.110.193.131/ServiceERM.svc/Historico/" + FechaRec + "/" + FechaRec + "?" + ordenUsuario;
        var params = {
            orden: ordenUsuario,
            output: "json"
        };
        $.ajax({
            url: Url,
            type: "GET",
            data: params,
            dataType: "json",
            async: false,
            success: function (data) {
                try {
                    cords = data.HistoricoResult.lstHistorico[0].lstCoordenadas;
                } catch (e) { mens("Error en Base de Sherloc", "error"); }
            },
            error: function (err) { mens("Error en servicio Sherloc", "error"); } //alert(JSON.stringify("error conexion err"+err)); }
        });
        return (cords);
    } catch (d) { mens("Error en servicio Sherloc", "error"); }
}

function calculateAndDisplayRoute2(directionsService, directionsDisplay, lat1, long1, puntosInt, lat2, long2) {
    try {
        var selectedMode = "DRIVING";
        var request = {
            origin: { lat: lat1, lng: long1 },
            destination: { lat: lat2, lng: long2 },
            waypoints: puntosInt,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            } else {
                alert('Se ha producido un error en la solicitud de' + status);
            }
        });
    } catch (k) {
        alert("Error al depliegue del mapa" );
    }
}

app.reporteApaEnce = kendo.observable({
    onShow: function () {
        $("#NoOrdenAE1").text(datos_Vehiculo.numeroorden);
        colorAE.push(["#c0392b"]);
        colorAE.push(["#1f618d"]);
        colorAE.push(["#f1c40f"]);
        colorAE.push(["#27ae60"]);
        colorAE.push(["#1c2833"]);
        colorAE.push(["#2e86c1"]);
        colorAE.push(["#a04000"]);
        colorAE.push(["#e74c3c"]);
        colorAE.push(["#99a3a4"]);
        colorAE.push(["#186a3b"]);
        initMapAE();
    },
    afterShow: function () { },
    inicializa: function () { }
});
app.localization.registerView('reporteApaEnce');
var infoWindow;
var mapAE;
var nombre = [];
var colorAE = [];
function initMapAE() {
    var height = (screen.height * 25.46875) / 100;
    var height1 = screen.height - height; //resto el valor en px que corresponde al % que sobra 
    document.getElementById("mapapen").style.height = height1 + "px";
    mapAE = new google.maps.Map(document.getElementById('mapapen'), {
        zoom: 12,
        center: { lat: -0.202408333333333, lng: -78.4929966666667 },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    google.maps.event.addListener(mapAE, 'click', function () {
        closeInfoWindow();
    });
    setMarkersAE(mapAE);
    rutasFR(mapAE);
}

var beachesAE = [];
var beachesAEF = [];
function closeInfoWindow() {
    infoWindow.close();
}

function setMarkersAE(mapAE) {
    try {
        //contruccion marcas
        beachesAE = [];
        var tama = registroAE.lstRecorridos.length;
        if (tama > 15) { registroAE.lstRecorridos.length = 15; }
        for (var i = 0; i < registroAE.lstRecorridos.length; i++) {
            beachesAE.push([parseFloat(registroAE.lstRecorridos[i].LatitudInicial), parseFloat(registroAE.lstRecorridos[i].LongitudInicial),
            registroAE.lstRecorridos[i].KilometrajeInicial, registroAE.lstRecorridos[i].FechaInicial, registroAE.lstRecorridos[i].Recorrido]);

            beachesAEF.push([parseFloat(registroAE.lstRecorridos[i].LatitudFinal), parseFloat(registroAE.lstRecorridos[i].LongitudFinal),
            registroAE.lstRecorridos[i].KilometrajeFinal, registroAE.lstRecorridos[i].FechaFinal, registroAE.lstRecorridos[i].TiempoEncendido]);

        }
        var shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],

            type: 'poly'
        };
        for (var i = 0; i < beachesAE.length; i++) {
            var beachAE = beachesAE[i];
            var beachAEF = beachesAEF[i];
            var markerAE = new google.maps.Marker({
                position: { lat: beachAE[0], lng: beachAE[1] },
                map: mapAE,
                icon: 'resources/icy_road.png',
                shape: shape,
                nombre: "marcado" + i
            });
            var markerAEF = new google.maps.Marker({
                position: { lat: beachAEF[0], lng: beachAEF[1] },
                map: mapAE,
                icon: 'resources/icy_road.png',
                shape: shape,
                nombre: "marcado" + i
            });
            google.maps.event.addListener(markerAE, 'click', (function (markerAE, i) {
                return function () {
                    infowindow = new google.maps.InfoWindow({
                        content: '<div style="text-align:center;">' +
                        '<b>Fecha y Hora Inicial </b><br/>' +
                        beachesAE[i][3] +
                        '<p><b>Kilometraje Inicial</b></p>' +
                        '<p>' + beachesAE[i][2] + ' KM</p>' +
                        '<p><b>Recorrido</b></p>' +
                        '<p>' + beachesAE[i][4] + ' </p>' +
                        '</div>'
                    });
                    infowindow.open(mapAE, markerAE);
                }
            })(markerAE, i));
            google.maps.event.addListener(markerAEF, 'click', (function (markerAEF, i) {
                return function () {
                    infowindow = new google.maps.InfoWindow({
                        content: '<div style="text-align:center;">' +
                        '<b>Fecha y Hora Final </b><br/>' +
                        beachesAEF[i][3] +
                        '<p><b>Kilometraje Final</b></p>' +
                        '<p>' + beachesAEF[i][2] + ' KM</p>' +
                        '<p><b>Tiempo Encendido</b></p>' +
                        '<p>' + beachesAEF[i][4] + ' </p>' +
                        '</div>'
                    });
                    infowindow.open(mapAE, markerAEF);
                }
            })(markerAEF, i));
        }
    } catch (e) { alert(e); }
}

function rutasFR(mapAE) {
    for (var h = 0; h < registroAE.lstRecorridos.length; h++) {
        var ruta = [
            new google.maps.LatLng(registroAE.lstRecorridos[h].LatitudInicial, registroAE.lstRecorridos[h].LongitudInicial),
            new google.maps.LatLng(registroAE.lstRecorridos[h].LatitudFinal, registroAE.lstRecorridos[h].LongitudFinal)
        ];
        var lineas = new google.maps.Polyline({
            path: ruta,
            map: mapAE,
            strokeColor: colorAE[h],
            strokeWeight: 4,
            strokeOpacity: 0.6,
            clickable: false
        });
    }
}
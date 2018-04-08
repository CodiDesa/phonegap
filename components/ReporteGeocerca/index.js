app.reporteGeocerca = kendo.observable({
    onShow: function () {
        //alert(datos_Vehiculo.numeroorden);
        $("#NoOrdenGC1").text(datos_Vehiculo.numeroorden);
        //initialize();
        initMapGC();
    },
    afterShow: function () { },
    inicializa: function () { }
});
app.localization.registerView('reporteGeocerca');
function rutasFR() {
    /*var myOptions = {
        center: new google.maps.LatLng(-0.202408333333333, -78.4929966666667),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("mapgeo"), myOptions);*/
    gozilla3 = new google.maps.Marker({
        position: new google.maps.LatLng(-0.13742833333333332, -78.48266333333333),
        icon: 'resources/27090icon.png',
        map: map,
        title: 'GodZZilla!!'
    });
    var ruta = [
        new google.maps.LatLng(-0.13742833333333332, -78.48266333333333),
        new google.maps.LatLng(-0.19804166666666667, -78.49496166666667)
        //new google.maps.LatLng(15.0203, 102.09)
    ];
    var lineas = new google.maps.Polyline({
        path: ruta,
        map: map,
        strokeColor: '#222000',
        strokeWeight: 4,
        strokeOpacity: 0.6,
        clickable: false
    });
}

var infoWindow;
var mapGC;
var nombre = [];
function initMapGC() {
    var height = (screen.height * 25.46875) / 100;
    var height1 = screen.height - height; //resto el valor en px que corresponde al % que sobra 
    document.getElementById("mapgeo").style.height = height1 + "px";
    mapGC = new google.maps.Map(document.getElementById('mapgeo'), {
        zoom: 16,
        center: { lat: -0.202408333333333, lng: -78.4929966666667 },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addListener(mapGC, 'click', function () {
        closeInfoWindow();
    });
    setMarkersGC(mapGC);
    setpoliGC(mapGC);
}

var beachesGC = [];
function closeInfoWindow() {
    infoWindow.close();
}

function setpoliGC(mapGC) {
    // Definiendo las coordenadas para el path del polígono  var lat = registroGC1[h].punto1.split(";",2);
    for (var h = 0; h < registroGC1.length; h++) {
        var triangleCoords1 = [];
        for (var j = 0; j < registroGC1[h].lstCoordenadas.length; j++) {
            triangleCoords1.push({ lat: parseFloat(registroGC1[h].lstCoordenadas[j].Latitud), lng: parseFloat(registroGC1[h].lstCoordenadas[j].Longitud) });
        }
        var poligono = new google.maps.Polygon({
            paths: triangleCoords1,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });
        poligono.setMap(mapGC);
    }
}
function setMarkersGC(mapGC) {
    try {
        //contruccion marcas
        beachesGC = [];
        var tama = registroGC.lstCoordGeo.length;
        if (tama > 15) { registroGC.lstCoordGeo.length = 15; }
        for (var i = 0; i < registroGC.lstCoordGeo.length; i++) {
            beachesGC.push([parseFloat(registroGC.lstCoordGeo[i].Latitud), parseFloat(registroGC.lstCoordGeo[i].Longitud), registroGC.lstCoordGeo[i].Kilometraje, registroGC.lstCoordGeo[i].Fecha, registroGC.lstCoordGeo[i].Estado]);
        }
        var shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],

            type: 'poly'
        };
        for (var i = 0; i < beachesGC.length; i++) {
            var beachGC = beachesGC[i];
            var markerGC = new google.maps.Marker({
                position: { lat: beachGC[0], lng: beachGC[1] },
                map: mapGC,
                icon: 'resources/icy_road.png',
                shape: shape,
                nombre: "marcado" + i
            });
            google.maps.event.addListener(markerGC, 'click', (function (markerGC, i) {
                return function () {
                    infowindow = new google.maps.InfoWindow({
                        content: '<div style="text-align:center;">' +
                        '<b>Fecha y Hora </b><br/>' +
                        beachesGC[i][3] +
                        '<p><b>Kilometraje del vehículo</b></p>' +
                        '<p>' + beachesGC[i][2] + ' KM</p>' +
                        '<p><b>Estado</b></p>' +
                        '<p>' + beachesGC[i][4] + ' </p>' +
                        '</div>'
                    });
                    infowindow.open(mapGC, markerGC);
                }
            })(markerGC, i));
        }
    } catch (e) { alert(e); }
}

app.reporteExcesos = kendo.observable({
    onShow: function () {
        $("#NoOrdenEX1").text(datos_Vehiculo.numeroorden);
        initMapE();
    },
    afterShow: function () { },
    inicializa: function () { }
});
app.localization.registerView('reporteExcesos');

// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.
var infoWindow;
var mapE;
var nombreE = [];
function initMapE() {
    var height = (screen.height * 25.46875) / 100;
    var height1 = screen.height - height; //resto el valor en px que corresponde al % que sobra 
    document.getElementById("mapexes").style.height = height1 + "px";
    mapE = new google.maps.Map(document.getElementById('mapexes'), {
        zoom: 12,
        center: { lat: -0.1808764, lng: -78.48463070000002 }
    });
    //infoWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(mapE, 'click', function () {
        closeInfoWindow();
    });
    setMarkersE(mapE);
}
/*function openInfoWindow(marker) {
    try {
        alert(inspeccionar(marker));
        var markerLatLng = marker.getPosition();
        infoWindow.setContent([
            '<div style="text-align:center;">',
            'Las coordenadas del <b>',

            '</b> son:<br/>',
            markerLatLng.lat(),
            ', ',
            markerLatLng.lng(),
            '<br/><br/>Arr&aacute;strame y haz click para actualizar la posici&oacute;n.',
            '<br/>O puedes hacer click en cualquier otro lado para cerrarme.',
            '</div>'
        ].join(''));
        infoWindow.open(mapE, marker);
    } catch (e) { alert(e); }
}
*/
// Data for the markers consisting of a name, a LatLng and a zIndex for the  //content,
// order in which these markers should display on top of each other.
var beachesE = [];
function closeInfoWindow() {
    infoWindow.close();
}
function setMarkersE(mapE) {
    try {
        beachesE = [];
        var tama = registro.lstAlarmas.length;
        if (tama > 15) { registro.lstAlarmas.length = 15; }
        for (var i = 0; i < registro.lstAlarmas.length; i++) {
            beachesE.push([parseFloat(registro.lstAlarmas[i].Latitud), parseFloat(registro.lstAlarmas[i].Longitud), registro.lstAlarmas[i].Velocidad,registro.lstAlarmas[i].Fecha]);
        }
        
        // Adds markers to the map.

        // Marker sizes are expressed as a Size of X,Y where the origin of the image
        // (0,0) is located in the top left of the image.

        // Origins, anchor positions and coordinates of the marker increase in the X
        // direction to the right and in the Y direction down.  'http://190.108.66.10:8089/biss.sherloc/pickup.png'
        var image = {
            url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            //'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(20, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 32)
        };
        // Shapes define the clickable region of the icon. The type defines an HTML
        // <area> element 'poly' which traces out a polygon as a series of X,Y points.
        // The final coordinate closes the poly by connecting to the first coordinate.
        var shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],

            type: 'poly'
        };
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        /*var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          icon: iconBase + 'parking_lot_maps.png'  'library_maps.png  'info-i_maps.png'
        });
        iconBase + 'parking_lot_maps.png'*/
        for (var i = 0; i < beachesE.length; i++) {
            var beach = beachesE[i];
            var marker = new google.maps.Marker({
                position: { lat: beach[0], lng: beach[1] },
                map: mapE,
                icon: 'resources/icy_road.png',
                shape: shape,
                nombre: "marcado" + i
            });
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow = new google.maps.InfoWindow({
                        content: '<div style="text-align:center;">' +
                        '<b>Fecha y Hora </b><br/>' +
                            beachesE[i][3] +
                        '<p><b>Velocidad del vehículo</b></p>' +
                        '<p>' + beachesE[i][2] + ' KMPH</p>' +
                        '</div>'
                    });
                    infowindow.open(mapE, marker);
                }
            })(marker, i));
        }
    } catch (e) { alert(e); }
}




if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    console.log("Geolocation is not supported by this browser.");
}

var startCoordsLat = null;
var startCoordsLong = null;

function showPosition(position) {
    startCoordsLat = position.coords.latitude
    startCoordsLong = position.coords.longitude;
}


function initMap() {
    const coordinates = { lat: 52.65126, lng: -0.47949 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: coordinates,
    });
    const marker = new google.maps.Marker({
        position: coordinates,
        map: map,
    });

    if (startCoordsLat != null && startCoordsLong !== null) {
        const movementCoords = [
            { lat: startCoordsLat, lng: startCoordsLong },
            { lat: 52.65126, lng: -0.47949 },
        ];
        const movementPath = new google.maps.Polyline({
            path: movementCoords,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });

        new google.maps.Marker({
            position: {lat: startCoordsLat  ,lng: startCoordsLong},
            label: "I am here",
            map: map,
          });

        movementPath.setMap(map);
    }




}
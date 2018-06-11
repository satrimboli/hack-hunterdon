$(document).ready(function() {

  
  // setTimeout(playWaypoint, 2000);

  // var interval = window.setInterval(playWaypoint, 30000);



});
var counter = 0;
var waypoints = $('.waypoint');
var currentWaypoint;

function playWaypoint(index) {
  console.log('playing waypoint ' + index);

  currentWaypoint = waypoints.eq(index);

  currentWaypoint.addClass('active');
  currentWaypoint.find('audio')[0].play();
  currentWaypoint[0].scrollIntoView();
}
var geocoder;
var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var locations = [
  [40.5066852, -74.8583799],
  [40.5078924, -74.8585569],
  [40.5103909,-74.8589048]
];

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(40.505, -74.85),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  directionsDisplay.setMap(map);
  var infowindow = new google.maps.InfoWindow();

  var marker, i;
  var request = {
    travelMode: google.maps.TravelMode.DRIVING
  };

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][0], locations[i][1])
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));

    if (i == 0) request.origin = marker.getPosition();
    else if (i == locations.length - 1) request.destination = marker.getPosition();
    else {
      if (!request.waypoints) request.waypoints = [];
      request.waypoints.push({
        location: marker.getPosition(),
        stopover: true
      });
    }

  }

  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

window.onload = function() {
  var prevPosition;
  var distance;

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position) {
      if(prevPosition && (position.coords.latitude === prevPosition.coords.latitude || position.coords.longitude === prevPosition.coords.longitude)) {
        return;
      }
      prevPosition = position;

      locations.forEach(function(value, index, arr) {
        distance = calculateDistance(value[0], value[1], position.coords.latitude, position.coords.longitude);
        console.log(index)
        console.log(distance)
        if(distance < .05) {
          playWaypoint(index);
        }
      });
    });
  }
};

// Reused code - copyright Moveable Type Scripts - retrieved May 4, 2010.
// http://www.movable-type.co.uk/scripts/latlong.html
// Under Creative Commons License http://creativecommons.org/licenses/by/3.0/
function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}
Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}
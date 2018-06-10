$(document).ready(function() {
  var counter = 0;
  var interval = window.setInterval(playWaypoint, 3000);
  var waypoints = $('.waypoint');
  var currentWaypoint;

  function playWaypoint() {
    console.log('playing waypoint ' + counter);

    currentWaypoint = waypoints.eq(counter);
    counter ++;

    currentWaypoint.addClass('active');
    currentWaypoint.find('audio')[0].play();
    currentWaypoint[0].scrollIntoView();
  }

});
var geocoder;
var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
  var locations = [
    ['South Branch of Central Railroad', 40.5066852, -74.8583799, 2],
    ['Flemington Filling Station', 40.5078924, -74.8585569, 3]
    ['Flemington Courthouse', 40.5103909,-74.8589048, 1],
    // ['Town Clock', 40.5117922,-74.8590777, 5],
    // ['Flemington War Veterans Memorial', 40.5130621,-74.8589991, 4]
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
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
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
google.maps.event.addDomListener(window, "load", initialize);

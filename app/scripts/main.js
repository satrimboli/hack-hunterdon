jQuery(function($) {
    // Asynchronously Load the map API
    var script = document.createElement('script');
    script.src = "//maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    // Change a few 'var variableName' to 'window.' This lets us set global variables from within our function
    window.directionsService = new google.maps.DirectionsService();
    window.directionsDisplay = new google.maps.DirectionsRenderer();
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Multiple Markers (Start & end destination)
    window.markers = [
        ['South Branch of Central Railroad (Start)', 40.5066852,-74.8583799],
        ['Flemington Filling Station', 40.5078924,-74.8585569],
        ['Flemington Courthouse (True Meridian Marker)', 40.5103909,-74.8589048]
    ];

    // Render our directions on the map
    directionsDisplay.setMap(map);

    // Set the current route - default: walking
    calcRoute();

}

// Calculate our route between the markers & set/change the mode of travel
function calcRoute() {
    var marker, i;
    var request = {
      travelMode: document.getElementById('travelType').value
    };
    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
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
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

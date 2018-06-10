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
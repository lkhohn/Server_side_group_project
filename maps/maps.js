// var map = new google.maps.Map(document.getElementById('map'), {
//   zoom: 12,
//   // where you wnat the map to be centered. This is Fort Collins
//   center: {
//     lat: 40.5592,
//     lng: -105.0781
//   }
// });
//
// var marker = new google.maps.Marker({
//   position: {
//     // where you wnat the marker to be. This is Fort Collins
//     lat: 40.5592,
//     lng: -105.0781
//   },
//   map: map,
//   draggable: true,
//   title: 'this is the marker'
// });
//
// // content is the information to be displayed with the pin
// var infoWindow = new google.maps.InfoWindow({
//   content: 'this is the infoWindow message'
// });
// // when you click on the pin, this will display the infoWindow content.
// google.maps.event.addListener(marker, 'click', function(){
//   infoWindow.open(map, marker);
// });
//
// google.maps.event.addListener(marker, 'dragend', function() {
//   // console.log(marker.getPosition().lat());
//   // console.log(marker.getPosition().lng());
//   // set the new marker location's lat and lng
//   var lat = marker.getPosition().lat();
//   var lng = marker.getPosition().lng();
//   // set those values equal to the form
//   $('#lat').val(lat);
//   $('#lng').val(lng);
//
//   localStorage.setItem('lat', lat);
//   localStorage.setItem('lng', lng);
// });

// Search
var map;
var infoWindow;
var service;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.5592, lng: -105.0781},
    zoom: 12
  });

  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  // The idle event is a debounced event, so we can query & listen without
  // throwing too many requests at the server.
  map.addListener('idle', performSearch);
}


function performSearch() {
  var request = {
    bounds: map.getBounds(),
    // keyword: 'best view',
    keyword: 'starbucks coffee',
    types: ['starbucks coffee']
  };
  service.radarSearch(request, callback);
}

function callback(results, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    addMarker(result);
  }
}

function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: 'http://maps.gstatic.com/mapfiles/circle.png',
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(10, 17)
    }
  });

  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      infoWindow.setContent(result.name);
      infoWindow.open(map, marker);
    });
  });
}

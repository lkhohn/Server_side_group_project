window.onload = function() {

  var yourApts = document.getElementById('yourApts');
  var invApts = document.getElementById('invApts');

  var map;
  var infoWindow;
  function initMap(num, pos) {
    //console.log("inside Init");
    var str = 'map'+num.toString();
    map = new google.maps.Map(document.getElementById(str), {
      center: pos,
      zoom: 8
    });

    infoWindow = new google.maps.InfoWindow();
    //console.log('inside init' + row.loc_lat);
    /*
    var pos = {
      lat: 40.5592,
      lng: -105.0781
    };
    */
    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found');
    map.setCenter(pos);
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      draggable: true,
      title: "You are here! Drag the marker to the preferred meeting area."
    });
  }
  var num = 0;
  var item = document.getElementById('map0');
  while (item !== undefined && item !== null) {
    //console.log(item);
    var pos = {
      lat: parseFloat(item.getAttribute("lat")),
      lng: parseFloat(item.getAttribute("lng"))
    };
    console.log(pos);
    initMap(num, pos);
    num ++;
    item = document.getElementById('map'+num);
  }
  //initMap();

  yourApts.addEventListener('click', function(event) {
    var tar = event.target;
    var child = tar.nextSibling;

    if (child === undefined || child === null || child.className !== 'row moreInfo') {
      child = tar.parentNode.nextSibling;
      console.log(child);
    }

    if (child.style.display === 'none')
      child.style.display = 'block';
    else
      child.style.display = 'none';
  });
  invApts.addEventListener('click', function(event) {
    var tar = event.target;
    var child = tar.nextSibling;
    if (child === undefined || child === null || child.className !== 'row moreInfo') {
      child = tar.parentNode.nextSibling;
      console.log(child);
    }

    if (child.style.display === 'none')
      child.style.display = 'block';
    else
      child.style.display = 'none';
  });
};

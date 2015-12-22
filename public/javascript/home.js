window.onload = function(){

  var yourApts = document.getElementById('yourApts');
  var invApts = document.getElementById('invApts');
  var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 40.5592,
        lng: -105.0781
      },
      zoom: 12
    });
  }

  yourApts.addEventListener('click', function(event){
    var tar = event.target;
    var child = tar.nextSibling;

    if(child === undefined || child === null || child.className !== 'row moreInfo')
    {
      child = tar.parentNode.nextSibling;
      console.log(child);
    }

    if(child.style.display === 'none')
      child.style.display = 'block';
    else
      child.style.display = 'none';
  });
  invApts.addEventListener('click', function(event){
    var tar = event.target;
    var child = tar.nextSibling;
    if(child === undefined || child === null || child.className !== 'row moreInfo')
    {
      child = tar.parentNode.nextSibling;
      console.log(child);
    }

    if(child.style.display === 'none')
      child.style.display = 'block';
    else
      child.style.display = 'none';
  });
};

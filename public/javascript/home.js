window.onload = function() {

  var yourApts = document.getElementById('yourApts');
  var invApts = document.getElementById('invApts');

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

function openNav() {
  document.getElementById("mySidenav").style.width = "500px";
  document.getElementById("main").style.marginLeft = "500px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}



function initMap() {
  const uluru = {
    lat: 32.292477656169176,
    lng: 54.331934987781956
  };


  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {

    zoom: 5.5,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

window.initMap = initMap;

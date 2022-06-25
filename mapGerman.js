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
    lat: 51.08996,
    lng: 10.07806
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: uluru,
  });

  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

window.initMap = initMap;

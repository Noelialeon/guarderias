/* eslint-disable */
$(document).ready(() => {
  var map;
  const geocoder = new google.maps.Geocoder();
  var pos;
  var center = {
    lat: 41.385064,
    lng: 2.173403,
  };
  var markers = [];
  var currentInfoWindow = null;

  //Añadir aquí la info que se muestra en la infowindow aquí:
  const contentString = (pin) => {
    return (
      `<div class="card-body">
      <h5 class="card-title">${pin.guarderia.name}</h5>
      <p class="card-text">${pin.guarderia.description}</p>
      <p class="card-text">${pin.guarderia.address.city}</p>      
      <a href="/profile/${pin.guarderia._id}" class="card-link">Ver guadería</a></div></div>`);
  };

  function startMap() {
    map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 15,
        center: center,
      }
    );
    var noPoi = [
      {
        featureType: "poi",
        stylers: [
          { visibility: "off" }
        ],
      }
    ];

    map.setOptions({ styles: noPoi });
    geocodeAddress();
    chargeGuarderias();
  }

  function geocodeAddress() {
    const address = document.getElementById('address').value;

    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const latit = results[0].geometry.location.lat();
        const long = results[0].geometry.location.lng();
        map.setCenter({ lat: latit, lng: long });
        map.setZoom(15);
      } else {
        alert(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  }

  function chargeGuarderias() {
    $.ajax({
      url: 'http://localhost:3000/chargeGuarderiasDB',
      method: 'GET',
      success: placeGuarderias,
      error(err) {
        console.log(err);
      },
    });
  }

  function placeGuarderias(response){

    response.forEach((guarderia) => {
      let pin = new google.maps.Marker({
        position: {
          lat: parseFloat(guarderia.address.coordinates[1]),
          lng: parseFloat(guarderia.address.coordinates[0]),
        },
        map: map,
        guarderia: guarderia,
      });
      const infowindow = new google.maps.InfoWindow({
        content: contentString(pin),
      });
      pin.addListener('click', function () {
        if (currentInfoWindow != null) {
          currentInfoWindow.close();
        }
        infowindow.open(map, pin);
        currentInfoWindow = infowindow;
      });
      markers.push(pin);
    });
  }

  function filterGuarderias() {
    var garden = $("#garden-checkbox").is(':checked') ? true : false;
    var swimmingPool = $("#swimming_pool-checkbox").is(':checked') ? true : false;
    var url = "http://localhost:3000/chargeGuarderiasDB/search?garden=" + garden + "&swimmingPool=" + swimmingPool;
    console.log(url);
    $.ajax({
      url: url,
      method: 'GET',
      success: function (guarderias) {
        console.log('guarderias', guarderias);
        deleteMarkers();
        placeGuarderias(guarderias);
      },
      error: function (error) {
        console.log('error');
      }
    });
  }

  function deleteMarkers() {
    markers.forEach((marker) => {
      marker.setMap(null);
      marker = null;

      markers = [];
    });
  }

  startMap();

  $('#geocode').submit(() => {
    event.preventDefault();
    geocodeAddress();
    chargeGuarderias();
  });

  $('#filter').submit(() => {
    event.preventDefault();
    filterGuarderias();
  });
});

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

  //Añadir aquí la info que se muestra en la tarjeta aquí:
  const contentString = (pin) => {
    console.log('pins are: ', pin);
    return (
      `<div class="card-body">
      <h5 class="card-title">${pin.name}</h5>
      <p class="card-text">Description</p>
      <a href="/profile/${pin._id}" class="card-link">Ver guadería</a></div></div>`);
  };
  
  function startMap() {
    map = new google.maps.Map(
      document.getElementById('map'),{
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
      
      map.setOptions({styles: noPoi});
  }

  function geocodeAddress() {
    const address = document.getElementById('address').value;

    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const latit = results[0].geometry.location.lat();
        const long = results[0].geometry.location.lng();
        map.setCenter({lat: latit, lng: long});
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
      success(response) {
        response.forEach((guarderia) => {
          let pin = new google.maps.Marker({
            position: {
              lat: guarderia.location.coordinates[1],
              lng: guarderia.location.coordinates[0],
            },
            map: map,
            name: guarderia.name
          });
          const infowindow = new google.maps.InfoWindow({
            content: contentString(pin),
          });
          pin.addListener('click', function() {
            if (currentInfoWindow != null) { 
              currentInfoWindow.close(); 
          }          
            infowindow.open(map, pin);
            currentInfoWindow = infowindow; 
          });
          markers.push(pin);
        });
      },

      error(err) {
        console.log(err);
      },
    });
    console.log('Markers are: ', markers);
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
    geocodeAddress();
    chargeGuarderias();
    event.preventDefault();
  });
});

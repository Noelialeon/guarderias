/* eslint-disable */
$(document).ready(() => {
  var map;
  const geocoder = new google.maps.Geocoder();
  var pos;
  var center = {
    lat: 41.385064,
    lng: 2.173403,
  };
  const currentCountry = " España";
  var markers = [];

  function geocodeAddress() {
    const address = document.getElementById('address').value + currentCountry;

    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const latit = results[0].geometry.location.lat();
        const long = results[0].geometry.location.lng();
        map.setCenter({lat: latit, lng: long})        
        console.log(address);
      } else {
        alert(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  }
  
  function chargeGuarderias() {
    $.ajax({
      url: 'http://localhost:3000/chargeGuarderiasDB',//montar aquí una ruta en la que me devuelva un json con la info de la DB mongo,
      method: 'GET',
      success(response) {
        response.forEach((guarderia) => {
          guarderia = new google.maps.Marker({
            position: {
              lat: guarderia.location.coordinates[1],
              lng: guarderia.location.coordinates[0],
            },
            map: map,
            title: guarderia.name
          });
          markers.push(guarderia);
        });
      },
      error(err) {
        console.log(err);
      },
    });
  }

  function startMap() {
    map = new google.maps.Map(
      document.getElementById('map'),
      {
        zoom: 15,
        center: center,
      },
    );
  }

  function deleteMarkers() {
    markers.forEach((marker) => {
      marker.setMap(null);
      marker = null;

      Markers = [];
    });
  }
  
  // function placeguarderias(guarderias){
  //   guarderias.forEach(function(guarderia){
  //     var center = {
  //       lat: guarderia.location.coordinates[1],
  //       lng: guarderia.location.coordinates[0]
  //     };
  //     var pin = new google.maps.Marker({
  //       position: center,
  //       map: map,
  //       title: guarderia.name
  //     });
  //     markers.push(pin)
  //   });
  // }


  function searchNearest () {
    $.ajax({
      url: "http://localhost:3000/chargeGuarderiasDB/search?lat=" + center.lat + "&lng=" + center.lng + "&dis=500",
      method: 'GET',
      success: function(guarderia) {
        console.log('guarderia', guarderia);
        placeGuarderia(guarderia);
      },
      error: function(error) {
        console.log('error'); 
      }
    });
    chargeGuarderias();
    
  };

  startMap();

  $('#geocode').submit(() => {
    geocodeAddress();
    event.preventDefault();
  });
});

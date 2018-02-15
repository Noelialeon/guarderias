/* eslint-disable */
$(document).ready(() => {
  var map;
  var geocoder = new google.maps.Geocoder();
  var pos;
  var center = {
    lat: 41.385064,
    lng: 2.173403,
  };
  var currentCountry = " España";

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
  
  // function chargeGuarderias() {
  //   $.ajax({
  //     url: 'http://localhost:27017/guarderias',
  //     method: 'GET',
  //     success(response) {
  //       response.forEach((guarderia) => {
  //         // console.log(guarderia);
  //         guarderia = new google.maps.Marker({
  //           position: {
  //             lat: guarderia.location.coordinates[1],
  //             lng: guarderia.location.coordinates[0],
  //           },
  //           map: map,
  //           title: guarderia.name
  //         });
  //         marker.push(guarderia);
  //       });
  //     },
  //     error(err) {
  //       console.log(err);
  //     },
  //   });
  // }

  // function currentPosition() {
    // chargeGuarderias();
  //   const currentMarker = new google.maps.Marker({ map });
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       pos = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };

  //       currentMarker.setPosition(pos);
  //       currentMarker.setContent('Location found.');
  //       map.setCenter(pos);
  //     }, () => {
  //       handleLocationError(true, currentMarker, map.getCenter());
  //     });
  //   } else {
  //     // Browser doesn't support Geolocation
  //     handleLocationError(false, currentMarker, map.getCenter());
  //   }
  // }

  function startMap() {
    map = new google.maps.Map(
      document.getElementById('map'),
      {
        zoom: 15,
        center: center,
      },
    );
   
    // currentPosition();
  }

  function deleteMarkers() {
    markers.forEach((marker) => {
      marker.setMap(null);
      marker = null;

      Markers = [];
    });
  }

  function searchNearest () {
    $.ajax({
      url: "http://localhost:3000/api/search?lat=" + center.lat + "&lng=" + center.lng + "&dis=500",
      method: 'GET',
      success: function(guarderia) {
        console.log('guarderia', guarderia);
        placeGuarderia(guarderia);
      },
      error: function(error) {
        console.log('error'); 
      }
    });
  };

  startMap();

  $('#geocode').submit(() => {
    geocodeAddress();
    event.preventDefault();
  });

  // $('#search').submit(() => {
  //   searchAround();
  //   event.preventDefault();
  // });
});

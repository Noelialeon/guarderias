/* eslint-disable */
$(document).ready(() => {
  var map;
  const geocoder = new google.maps.Geocoder();
  var pos;
  var center = {
    lat: 41.385064,
    lng: 2.173403,
  };
  var marker = [];

  function startMap() {
    map = new google.maps.Map(
      document.getElementById('map-profile'), {
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
  }

  function geocodeAddress() {
    const address = document.getElementById('address').innerHTML

    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const latit = results[0].geometry.location.lat();
        const long = results[0].geometry.location.lng();
        map.setCenter({ lat: latit, lng: long });
        map.setZoom(15);
        placeGuarderia(latit,long);
      } else {
        alert(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  }

  function placeGuarderia(latit, long){
    let pin = new google.maps.Marker({
      position: {
        lat: latit,
        lng: long,
      },
      map: map,
    });
    marker.push(pin);
  }

  startMap();
});

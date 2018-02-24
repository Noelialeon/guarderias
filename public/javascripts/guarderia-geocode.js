/* eslint-disable */
$(document).ready(() => {
  const geocoder = new google.maps.Geocoder();
  function geocodeAddress() {

    var address =
    document.getElementById('guarderia-street').value + ' ' +
    document.getElementById('guarderia-streetnumber').value + ' ' +
    document.getElementById('guarderia-postcode').value + ' ' +
    document.getElementById('guarderia-city').value;

    geocoder.geocode({ address }, function (results, status) {
      if (status === 'OK') {
        var latit = results[0].geometry.location.lat();
        var long = results[0].geometry.location.lng();
        document.getElementById('latitude').setAttribute('value', latit);
        document.getElementById('longitude').setAttribute('value', long);
        $("#found").show();
        $("#not-found").hide();
      } else {
        $("#found").hide();
        $("#not-found").show();
        
      }
    });
  }

  $('#verifyAddress').click(() => {
    event.preventDefault();
    geocodeAddress();
  });
});

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

  const contentString = (pin) => {

    var guarderiaCard = `<div class="card-body">`

    if (pin.guarderia.otherpics.length !== 0) {
      guarderiaCard +=
        `<div id="carouselExampleIndicators" class="carousel slide" style="max-width:150px" data-ride="carousel">
            <ol class="carousel-indicators halfsize">`;
      pin.guarderia.otherpics.forEach(function (path, index, array) {
        if (index === 0) {
          guarderiaCard +=
            `<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>`;
        } else {
          guarderiaCard +=
            `<li data-target="#carouselExampleIndicators" data-slide-to="<${index}>"></li>`;
        }
      });
      guarderiaCard +=
        ` </ol>
              <div class="carousel-inner card-img">`;
      pin.guarderia.otherpics.forEach(function (path, index, array) {
        if (index === 0) {
          guarderiaCard +=
            `<div class="carousel-item active">
              <img class="d-block h-100" src=${path}>
                </div>`;
        } else {
          guarderiaCard +=
            `<div class="carousel-item">
                  <img class="d-block h-100" src=${path}>
                    </div>`;
        }
      });
      guarderiaCard +=
        `</div>
       <a class="carousel-control-prev halfsize" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
       </a>
        <a class="carousel-control-next halfsize" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>`;
    }

    guarderiaCard +=
      `<h5 class="card-title">${pin.guarderia.name}</h5>
    <p class="card-text">${pin.guarderia.description}</p>
    <p class="card-text">${pin.guarderia.address.city}</p>
    <a href="/guarderias/profile/${pin.guarderia.username}" class="card-link">Ver guadería</a></div></div>`

    return (guarderiaCard);
  };

  function startMap() {
    map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 16,
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
        map.setZoom(16);
      };
    });
  }

  function chargeGuarderias() {
    var garden = $("#garden-checkbox").is(':checked') ? true : false;
    var swimmingPool = $("#swimming_pool-checkbox").is(':checked') ? true : false;
    if (!garden && !swimmingPool) {
      var url = "http://localhost:3000/chargeGuarderiasDB"
    } else {
      var url = "http://localhost:3000/chargeGuarderiasDB/search?services.garden=" + garden + "&swimmingPool=" + swimmingPool + "&kitchen=" + kitchen + "&extraHours=" + extraHours + "&parkingCarrito=" + parkingCarrito + "&locker=" + locker + "&spanish=" + spanish + "&english=" + english + "&german=" + german
    }
    $.ajax({
      url: url,
      method: 'GET',
      success: function (guarderias) {
        console.log(guarderias);
        deleteMarkers();
        placeGuarderias(guarderias);
      },
      error: function (error) {
        console.log('error');
      }
    });
  }

  function placeGuarderias(response) {
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
    chargeGuarderias();
  });
});

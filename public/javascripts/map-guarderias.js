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
  var totalList = [];

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
  };

  function chargeGuarderias() {
    var query = $('#filter').serialize();
    var url = `http://localhost:3000/chargeGuarderiasDB/search?${query}`;
    console.log('url', url)
    $.ajax({
      url: url,
      method: 'GET',
      success: function (guarderias) {
        if ($("#map").css('display') == 'none') {
          listGuarderias(guarderias);
        } else {
          placeGuarderias(guarderias);
        }
      },
      error(err) {
        console.log(err);
      },
    });
  };

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

  function listGuarderias(response) {
    response.forEach((guarderia) => {
      var guarderiaCard =
        `<div class="col-md-4 col-sm-6 col-xs-12">
       <div class="card">`;
      if (guarderia.otherpics.length !== 0) {
        guarderiaCard +=
          `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators halfsize">`;
        guarderia.otherpics.forEach(function (path, index, array) {
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
              <div class="carousel-inner list-card-img">`;
        guarderia.otherpics.forEach(function (path, index, array) {
          if (index === 0) {
            guarderiaCard +=
              `<div class="carousel-item active">
              <img class="d-block" src=${path}>
                </div>`;
          } else {
            guarderiaCard +=
              `<div class="carousel-item">
                  <img class="d-block" src=${path}>
                    </div>`;
          }
        });
        guarderiaCard +=
          `</div>
        <div class="d-flex">

       <a class="carousel-control-prev halfsize" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
       </a>
        <a class="carousel-control-next halfsize" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
        </div>
      </div>`;
      }
      guarderiaCard +=
        `<div class="card-body">
      <h5 class="card-title">${guarderia.name}</h5>
      <p class="card-text">${guarderia.description}</p>
      <p id="servicios">Servicios</p>
      <div class="row justify-content-left">`;

      if (guarderia.services.spanish) {
        guarderiaCard +=
          `<div class="col-md-3">
            <img src="${guarderia.services.spanish_path}" class="halfsize" data-toggle="tooltip" data-placement="bottom" title="Español">
          </div>`;
      };
      if (guarderia.services.english) {
        guarderiaCard +=
          `<div class="col-md-3">
                  <img src="${guarderia.services.english_path}" class="halfsize" data-toggle="tooltip" data-placement="bottom" title="Inglés">
                </div>`;
      };
      if (guarderia.services.german) {
        guarderiaCard +=
          `<div class="col-md-3">
        <img src="${guarderia.services.german_path}" class="halfsize" data-toggle="tooltip" data-placement="bottom" title="Alemán">
      </div>`;
      };
      if (guarderia.services.garden) {
        guarderiaCard +=
          `<div class="col-md-3">
        <img src="${guarderia.services.garden_path}" class="halfsize" data-toggle="tooltip" data-placement="bottom" title="Jardín">
      </div>`;
      };
      if (guarderia.services.kitchen) {
        guarderiaCard +=
          `<div class="col-md-3">
        <img src="${guarderia.services.kitchen_path}" class="halfsize" data-toggle="tooltip" data-placement="bottom" title="Cocina">
      </div>`;
      };
      if (guarderia.services.extra_hour) {
        guarderiaCard +=
          `<div class="col-md-3">
        <img src="${guarderia.services.extra_hour_path}" class="halfsize" data-toggle="tooltip" data-placement="bottom" title="Actividades extracurriculares">
      </div>`;
      };
      if (guarderia.services.parking_carrito) {
        guarderiaCard +=
          `<div class="col-md-3">
        <img src="${guarderia.services.parking_carrito_path}" class="halfsize" data-toggle="tooltip" data-placement="bottom" title="Parking para carritos">
      </div>`;
      };
      if (guarderia.services.locker) {
        guarderiaCard +=
          `<div class="col-md-3">
        <img src="${guarderia.services.locker_path}" class="halfsize" data-toggle="tooltip" data-placement="bottom" title="Taquillas">
      </div>`;
      };
      if (guarderia.services.swimming_pool) {
        guarderiaCard +=
          `<div class="col-md-3">
        <img src="${guarderia.services.swimming_pool_path}" class="halfsize" data-toggle="tooltip" data-placement="bottom" title="Piscina">
      </div>`;
      };

      guarderiaCard +=
        `</div >
        <a href="/guarderias/profile/${guarderia.username}" class="card-link">Ver guadería</a>
        </div>
        </div >
        </div >
        </div >`;

      $("#guarderias-list").append(guarderiaCard);
      totalList.push(guarderia);
    });
  };

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

  function deleteGuarderias() {
    if ($("#map").css('display') == 'none') {
      totalList = [];
      $("#guarderias-list").empty();
    } else {
      markers.forEach((marker) => {
        marker.setMap(null);
        marker = null;
      });
      markers = [];
    }
  };

  $('#geocode').submit(() => {
    event.preventDefault();
    geocodeAddress();

  });

  $('#charge-list').on("click", () => {
    if ($("#guarderias-list").css('display') == 'none') {
      event.preventDefault();
      $("#map").toggle();
      $("#guarderias-list").toggle();
        deleteGuarderias();
        submitSearchQuery();
    }
  });

  $('#charge-map').on("click", () => {
    if ($("#map").css('display') == 'none') {
      event.preventDefault();
      $("#map").toggle();
      $("#guarderias-list").toggle();
      deleteGuarderias();
        submitSearchQuery();
    };
  });

  $('#filter').submit(() => {
    event.preventDefault();
    submitSearchQuery();
  });

  function submitSearchQuery() {
    var query = $('#filter').serialize();
    var url = `http://localhost:3000/chargeGuarderiasDB/searchfilter?${query}`;
    console.log('url', url)
    $.ajax({
      url: url,
      method: 'GET',
      success: function (guarderias) {
        deleteGuarderias();
        if ($("#map").css('display') == 'none') {
          listGuarderias(guarderias);
        } else {
          placeGuarderias(guarderias);
        }
      },
      error(err) {
        console.error(err);
      },
    });
  }

  startMap();

});

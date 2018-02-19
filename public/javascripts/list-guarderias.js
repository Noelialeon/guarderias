/* eslint-disable */
$(document).ready(() => {
  var totalList = [];

  function chargeGuarderias() {
    $.ajax({
      url: 'http://localhost:3000/chargeGuarderiasDB',
      method: 'GET',
      success: listGuarderias,
      error(err) {
        console.log(err);
      },
    });
  }

  function listGuarderias(response) {
    response.forEach((guarderia) => {
      var guarderiaCard =
        `<div class="card">
      <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
      <div class="card-body">
        <h5 class="card-title">${guarderia.name}</h5>
        <p class="card-text">${guarderia.description}</p>
        <p class="card-text">¿Jardín? ${guarderia.facilities.garden}</p>
        <a href="/profile/${guarderia._id}" class="card-link">Ver guadería</a>
      </div>
    </div>`;
      $("#guarderias-list").append(guarderiaCard);
      totalList.push(guarderia);
    });
  };

  // function filterGuarderias() {
  //   var garden = $("#garden-checkbox").is(':checked') ? true : false;
  //   console.log(garden);
  //   var url = "http://localhost:3000/chargeGuarderiasDB/search?facilities.garden=" + garden;
  //   console.log(url);
  //   $.ajax({
  //     url: url,
  //     method: 'GET',
  //     success: function (guarderias) {
  //       console.log('guarderias', guarderias);
  //       deleteMarkers();
  //       placeGuarderias(guarderias);
  //     },
  //     error: function (error) {
  //       console.log('error');
  //     }
  //   });
  // }

  // function deleteMarkers() {
  //   markers.forEach((marker) => {
  //     marker.setMap(null);
  //     marker = null;

  //     markers = [];
  //   });
  // }

  $('#charge-list').on("click", () => {
    event.preventDefault();
    $("#map").hide();
    $("#guarderias-list").show();
    if (totalList == 0) {
      chargeGuarderias();
    }
  });

  $('#charge-map').on("click", () => {
    event.preventDefault();
    $("#map").show();
    $("#guarderias-list").hide();

  });
});

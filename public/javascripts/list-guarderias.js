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
      `<div class="col-md-3 col-sm-6 col-xs-12">
      <div class="card">
        <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
        <div class="card-body">
          <h5 class="card-title">${guarderia.name}</h5>
          <p class="card-text">${guarderia.description}</p>
          <p class="card-text">Jardín ${guarderia.facilities.garden}</p>
          <p class="card-text">Piscina ${guarderia.facilities.swimming_pool}</p>
          <a href="/guarderias/profile/${guarderia._id}" class="card-link">Ver guadería</a>
        </div>
      </div>
    </div>
        <br>`;
      $("#guarderias-list").append(guarderiaCard);
      totalList.push(guarderia);
    });
  };

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

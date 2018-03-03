/* eslint-disable */
$(document).ready(() => {
  var totalList = [];

  function chargeGuarderiasList() {
    var garden = $("#garden-checkbox").is(':checked') ? true : false;
    var swimmingPool = $("#swimming_pool-checkbox").is(':checked') ? true : false;
    var kitchen = $("#kitchen").is(':checked') ? true : false;
    var extraHours = $("#extra_hours-checkbox").is(':checked') ? true : false;
    var parkingCarrito = $("#parking_carrito-checkbox").is(':checked') ? true : false;var garden = $("#garden-checkbox").is(':checked') ? true : false;
    var locker = $("#locker-checkbox").is(':checked') ? true : false;
    var spanish = $("#spanish-checkbox").is(':checked') ? true : false;var garden = $("#garden-checkbox").is(':checked') ? true : false;
    var english = $("#english-checkbox").is(':checked') ? true : false;
    var german = $("#german-checkbox").is(':checked') ? true : false;
    

    if (!garden && !swimmingPool) {
      var url = "http://localhost:3000/chargeGuarderiasDB"
    } else {
      var url = "http://localhost:3000/chargeGuarderiasDB/search?garden=" + garden + "&swimmingPool=" + swimmingPool + "&kitchen=" + kitchen + "&extraHours=" + extraHours + "&parkingCarrito=" + parkingCarrito + "&locker=" + locker + "&spanish=" + spanish + "&english=" + english + "&german=" + german}
    $.ajax({
      url: url,
      method: 'GET',
      success: function (guarderias) {
        deleteList();
        listGuarderias(guarderias);
      },
      error(err) {
        console.log(err);
      },
    });
  };

  function listGuarderias(response) {
    response.forEach((guarderia) => {
        var guarderiaCard =
            `<div class="col-md-4 col-sm-6 col-xs-12">
             <div class="card">`;
      if (guarderia.otherpics.length !== 0) {
        guarderiaCard +=
            `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">`;
      guarderia.otherpics.forEach(function(path, index, array){
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
      guarderia.otherpics.forEach(function(path, index, array) {
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

         <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
         </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
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
        </div >
        </div >
        </div >
        <br>`;

      $("#guarderias-list").append(guarderiaCard);
      totalList.push(guarderia);
    });
  };

  function deleteList() {
    totalList = [];
    $("#guarderias-list").empty();
  }

  $('#charge-list').on("click", () => {
    event.preventDefault();
    $("#map").toggle();
    $("#guarderias-list").toggle();
    if (totalList == 0) {
      chargeGuarderiasList();
    }
  });

  $('#charge-map').on("click", () => {
    event.preventDefault();
    $("#map").toggle();
    $("#guarderias-list").toggle();
  });

  $('#filter').submit(() => {
      event.preventDefault();
      chargeGuarderiasList();
  });
});

$(document).ready(function () {

  // ALERTA DE BIENVENIDA (
  if (!localStorage.getItem("bienvenida")) {
    alert(" ¡Bienvenido a CinePlus! Disfruta de nuestras películas.");
    localStorage.setItem("bienvenida", "true");
  }

  // DELEGACIÓN DE EVENTOS PARA BOTONES "VER TRÁILER"
 
  $(document).on('click', '.btn-trailer', function () {
    let trailerURL = $(this).data('trailer');
    let titulo = $(this).data('titulo');

    $('#trailerModal .modal-title').text('Tráiler: ' + titulo);
    $('#trailerIframe').attr('src', trailerURL);

    let modal = new bootstrap.Modal(document.getElementById('trailerModal'));
    modal.show();
  });

  // Limpiar iframe al cerrar el modal
  $('#trailerModal').on('hidden.bs.modal', function () {
    $('#trailerIframe').attr('src', '');
  });

  // SIMULAR CARGA CON 5 SEGUNDOS 
  setTimeout(function () {

    //CARGAR PELÍCULAS CON AJAX 
    $.ajax({
      url: "data/peliculas.json",
      method: "GET",
      dataType: "json",

      success: function (peliculas) {
        let html = "";

        peliculas.forEach(function (peli) {
          const hoy = new Date();
          const fechaEstreno = new Date(peli.estreno);
          let precio, badge;

          if (hoy <= fechaEstreno) {
            precio = peli.precios.estreno;
            badge = "<span class='badge bg-danger'>Estreno</span>";
          } else {
            precio = peli.precios.normal;
            badge = "<span class='badge bg-success'>En cartelera</span>";
          }

          html += `
            <div class="col-md-4">
              <div class="card h-100 shadow">
                <img src="img/${peli.imagen}" class="card-img-top" alt="${peli.titulo}">
                <div class="card-body">
                  <h5 class="card-title">${peli.titulo} ${badge}</h5>
                  <p class="card-text">${(peli.generos || []).join(", ")}</p>
                  <p class="card-text">Precio: $${precio}</p>
                  <div class="d-flex gap-2 mt-2">
                    <a href="pages/detalle.html?id=${peli.id}" class="btn btn-primary btn-sm">Ver más</a>
                    <button type="button" class="btn btn-outline-secondary btn-sm btn-trailer" data-trailer="${peli.trailer}" data-titulo="${peli.titulo}">Ver tráiler</button>
                  </div>
                </div>
              </div>
            </div>`;
        });

        //Animación fadeOut/fadeIn
        $("#lista-peliculas").fadeOut(200, function () {
          $(this).html(html);
          $(this).fadeIn(800);
        });
      },

      error: function (xhr, status, error) {
        console.error("Error al cargar las películas:", error);
        $("#lista-peliculas").html(`
          <div class="col-12">
            <div class="alert alert-danger text-center">
              No se pudo cargar la lista de películas. Intenta nuevamente más tarde.
            </div>
          </div>
        `);
      }
    });

  }, 5000); // 5 segundos de espera

});

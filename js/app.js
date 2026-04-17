$(document).ready(function () {
  $.ajax({
    url: "data/peliculas.json",
    method: "GET",
    dataType: "json",

    success: function (peliculas) {

      let html = "";

      peliculas.forEach(function (peli) {

        let hoy = new Date();
        let fechaEstreno = new Date(peli.estreno);

        let precio;
        let badge;

        if (fechaEstreno >= hoy) {
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
                <p class="card-text">${peli.genero}</p>
                <p class="card-text">Precio: $${precio}</p>
                <a href="pages/detalle.html?id=${peli.id}" class="btn btn-primary">Ver más</a>
              </div>
            </div>
          </div>`;
      });

      $("#lista-peliculas").html(html);
    },

    error: function (xhr, status, error) {
      console.error("Error al cargar las películas:", error);
    }
  });
});
$(document).ready(function () {
  $.ajax({
    url: "data/peliculas.json",
    method: "GET",
    dataType: "json",

    success: function (peliculas) {

      let html = "";

      peliculas.forEach(function (peli) {

  const hoy = new Date();
  const fechaEstreno = new Date(peli.estreno);

  let precio;
  let badge;

  if (hoy <= fechaEstreno) {
    precio = peli.precios.estreno;
    badge = "<span class='badge bg-danger'>Estreno</span>";
  } else {
    precio = peli.precios.normal;
    badge = "<span class='badge bg-success'>En cartelera</span>";
  }
// SOLO se ejecuta en detalle.html
if (window.location.pathname.includes("detalle.html")) {

  let id = new URLSearchParams(window.location.search).get("id");

  $.getJSON("../data/reseñas.json", function (reseñas) {

    let filtradas = reseñas.filter(r => r.peliculaId == id);

    let html = "";

    filtradas.forEach(r => {

      let estrellas = "*".repeat(r.calificacion);

      html += `
        <div class="card mb-2 p-2">
          <strong>${r.usuario}</strong>
          <p>${r.comentario}</p>
          <div>${estrellas}</div>
        </div>
      `;
    });

    $("#reseñas").html(html);

  });

}
  
  html += `
    <div class="col-md-4">
      <div class="card h-100 shadow">
        <img src="img/${peli.imagen}" class="card-img-top" alt="${peli.titulo}">
        <div class="card-body">
          <h5 class="card-title">${peli.titulo} ${badge}</h5>
          <p class="card-text">${(peli.generos || []).join(", ")}
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
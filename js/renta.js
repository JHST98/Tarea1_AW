let peliculas = [];

$(document).ready(function () {

  // Cargar películas
  $.getJSON("../data/peliculas.json", function (data) {
    peliculas = data;

    data.forEach(p => {
      $("#peliculas").append(`
        <option value="${p.id}">
          ${p.titulo}
        </option>
      `);
    });
  });

  // Evento formulario
  $("#formRenta").submit(function (e) {
    e.preventDefault();

    let cliente = $("#cliente").val();
    let ids = $("#peliculas").val();
    let dias = parseInt($("#dias").val());
    let pago = $("#pago").val();

    let total = 0;
    let lista = "";

    ids.forEach(id => {
      let peli = peliculas.find(p => p.id == id);

      let hoy = new Date();
      let estreno = new Date(peli.estreno);

      let precio = (hoy < estreno)
        ? peli.precios.estreno
        : peli.precios.normal;

      total += precio * dias;

      lista += `<li>${peli.titulo} - $${precio} x ${dias} días</li>`;
    });

    $("#resumen").html(`
      <p><strong>Cliente:</strong> ${cliente}</p>
      <p><strong>Películas:</strong></p>
      <ul>${lista}</ul>
      <p><strong>Días:</strong> ${dias}</p>
      <p><strong>Pago:</strong> ${pago}</p>
      <h4>Total: $${total}</h4>
    `);

    let modal = new bootstrap.Modal(document.getElementById('modalResumen'));
    modal.show();

  });

});
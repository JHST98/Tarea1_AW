let peliculas = [];

$(document).ready(function () {

  // Cargar películas ANTES de que el usuario pueda enviar
  $.getJSON("../data/peliculas.json", function (data) {
    peliculas = data;
    console.log("Películas cargadas:", peliculas);

    // Llenar el select múltiple
    data.forEach(function (peli) {
      $("#peliculas").append(`
        <option value="${peli.id}">
          ${peli.titulo}
        </option>
      `);
    });
  }).fail(function() {
    console.error("Error: no se pudo cargar peliculas.json");
    $("#peliculas").append('<option>Error al cargar películas</option>');
  });

  // Evento submit del formulario
  $("#formRenta").submit(function (e) {
    e.preventDefault();

    let cliente = $("#cliente").val().trim();
    let ids = $("#peliculas").val();  // Array de ids seleccionados
    let dias = parseInt($("#dias").val());
    let pago = $("#pago").val();

    // Validaciones
    if (cliente === "") {
      alert("Ingresa el nombre del cliente");
      return;
    }
    if (!ids || ids.length === 0) {
      alert("Selecciona al menos una película");
      return;
    }
    if (isNaN(dias) || dias < 1) {
      alert("Los días deben ser un número mayor a 0");
      return;
    }

    const hoy = new Date();
    let total = 0;
    let lista = "";

    ids.forEach(function (id) {
      let peli = peliculas.find(p => p.id == id);
      if (peli) {
        let fechaEstreno = new Date(peli.estreno);
        // CORRECCIÓN: usar <= para que el día del estreno cuente como estreno
        let precio = (hoy <= fechaEstreno) ? peli.precios.estreno : peli.precios.normal;
        total += precio * dias;
        lista += `<li>${peli.titulo} - $${precio} x ${dias} día(s)</li>`;
      }
    });

    // Mostrar resumen en el modal
    $("#resumen").html(`
      <p><strong>Cliente:</strong> ${cliente}</p>
      <p><strong>Películas:</strong></p>
      <ul>${lista}</ul>
      <p><strong>Días de renta:</strong> ${dias}</p>
      <p><strong>Forma de pago:</strong> ${pago}</p>
      <h4>Total a pagar: $${total}</h4>
    `);

    // Mostrar modal de Bootstrap
    let modal = new bootstrap.Modal(document.getElementById('modalResumen'));
    modal.show();
  });
});
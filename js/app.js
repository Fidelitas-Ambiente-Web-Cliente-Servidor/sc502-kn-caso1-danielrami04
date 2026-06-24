const menu = [
  { nombre: 'Bruschetta Clásica',     descripcion: 'Pan tostado con tomate y albahaca fresca',    precio: 4500,  categoria: 'Entrada'      },
  { nombre: 'Tabla de Quesos',         descripcion: 'Selección de quesos importados con mermelada', precio: 7800,  categoria: 'Entrada'      },
  { nombre: 'Lomo al Vino Tinto',      descripcion: 'Lomo de res en reducción de vino tinto',       precio: 15500, categoria: 'Plato Fuerte' },
  { nombre: 'Pasta Carbonara',         descripcion: 'Pasta con tocino, huevo y queso parmesano',    precio: 10200, categoria: 'Plato Fuerte' },
  { nombre: 'Salmón a la Plancha',     descripcion: 'Filete de salmón con vegetales al vapor',      precio: 13800, categoria: 'Plato Fuerte' },
  { nombre: 'Tiramisú',               descripcion: 'Postre italiano con café y mascarpone',          precio: 5200,  categoria: 'Postre'       },
  { nombre: 'Cheesecake de Maracuyá', descripcion: 'Cheesecake cremoso con coulis de maracuyá',    precio: 4800,  categoria: 'Postre'       },
];

const reservas = [];

let categoriaActual = "Todos";

// Cuando la página carga, esta función muestra todos los platillos del menú
function renderMenu() {
  const contenedorMenu = document.getElementById("contenedorMenu");
  const contadorMenu = document.getElementById("contadorMenu");

  contenedorMenu.innerHTML = "";

  let listaPlatillos = menu;

  if (categoriaActual !== "Todos") {
    listaPlatillos = menu.filter(function (plato) {
      return plato.categoria === categoriaActual;
    });
  }

  contadorMenu.textContent =
    `Mostrando ${listaPlatillos.length} platillo(s) de la categoría: ${categoriaActual}`;

  listaPlatillos.forEach(function (plato) {
    const columna = document.createElement("div");
    columna.classList.add("col-md-4");

    const card = document.createElement("article");
    card.classList.add("card-plato");

    const nombre = document.createElement("h3");
    nombre.textContent = plato.nombre;

    const descripcion = document.createElement("p");
    descripcion.textContent = plato.descripcion;

    const precio = document.createElement("p");
    precio.classList.add("precio");
    precio.textContent = `₡${plato.precio.toLocaleString("es-CR")}`;

    const categoria = document.createElement("span");
    categoria.classList.add("categoria");
    categoria.textContent = plato.categoria;

    card.appendChild(nombre);
    card.appendChild(descripcion);
    card.appendChild(precio);
    card.appendChild(categoria);

    columna.appendChild(card);
    contenedorMenu.appendChild(columna);
  });
}

// Esta función cambia la categoría que se ve segun el botón que se presione
function filtrarCategoria(categoria) {
  categoriaActual = categoria;

  const botones = document.querySelectorAll(".btn-filtro");

  botones.forEach(function (boton) {
    boton.classList.remove("activo");

    if (boton.dataset.categoria === categoria) {
      boton.classList.add("activo");
    }
  });

  renderMenu();
}

// Aquí  se revisa que los campos obligatorios tengan datos válidos
function validarFormulario() {
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const fecha = document.getElementById("fecha");
  const personas = document.getElementById("personas");
  const btnReserva = document.getElementById("btnReserva");

  const errorNombre = document.getElementById("errorNombre");
  const errorCorreo = document.getElementById("errorCorreo");
  const errorFecha = document.getElementById("errorFecha");
  const errorPersonas = document.getElementById("errorPersonas");

  let formularioValido = true;

  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  errorNombre.textContent = "";
  errorCorreo.textContent = "";
  errorFecha.textContent = "";
  errorPersonas.textContent = "";

  if (nombre.value.trim().length < 5 || !regexNombre.test(nombre.value.trim())) {
    errorNombre.textContent = "El nombre debe tener mínimo 5 letras y no llevar números.";
    formularioValido = false;
  }

  if (!regexCorreo.test(correo.value.trim())) {
    errorCorreo.textContent = "Revisa el correo, debe tener un formato válido.";
    formularioValido = false;
  }

  if (fecha.value === "") {
    errorFecha.textContent = "Selecciona una fecha para la reserva.";
    formularioValido = false;
  } else {
    const fechaSeleccionada = new Date(fecha.value + "T00:00:00");
    const fechaActual = new Date();

    fechaActual.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < fechaActual) {
      errorFecha.textContent = "No se puede reservar en una fecha pasada.";
      formularioValido = false;
    }
  }

  if (
    personas.value.trim() === "" ||
    Number(personas.value) < 1 ||
    Number(personas.value) > 20
  ) {
    errorPersonas.textContent = "La cantidad permitida es de 1 a 20 personas.";
    formularioValido = false;
  }

  btnReserva.disabled = !formularioValido;

  return formularioValido;
}

// Si el formulario está correcto, esta función agrega la reserva a la tabla
function agregarReserva() {
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const fecha = document.getElementById("fecha");
  const hora = document.getElementById("hora");
  const personas = document.getElementById("personas");
  const comentarios = document.getElementById("comentarios");
  const tablaReservas = document.getElementById("tablaReservas");
  const formReserva = document.getElementById("form-reserva");
  const btnReserva = document.getElementById("btnReserva");
  const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");

  const nuevaReserva = {
    nombre: nombre.value.trim(),
    correo: correo.value.trim(),
    fecha: fecha.value,
    hora: hora.value,
    personas: Number(personas.value),
    comentarios: comentarios.value.trim()
  };

  reservas.push(nuevaReserva);

  const fila = document.createElement("tr");
  fila.classList.add("fila-reserva");

  if (nuevaReserva.personas >= 6) {
    fila.classList.add("reserva-grande");
  }

  const celdaNombre = document.createElement("td");
  celdaNombre.textContent = nuevaReserva.nombre;

  const celdaCorreo = document.createElement("td");
  celdaCorreo.textContent = nuevaReserva.correo;

  const celdaFecha = document.createElement("td");
  celdaFecha.textContent = nuevaReserva.fecha;

  const celdaHora = document.createElement("td");
  celdaHora.textContent = nuevaReserva.hora;

  const celdaPersonas = document.createElement("td");
  celdaPersonas.textContent = nuevaReserva.personas;

  fila.appendChild(celdaNombre);
  fila.appendChild(celdaCorreo);
  fila.appendChild(celdaFecha);
  fila.appendChild(celdaHora);
  fila.appendChild(celdaPersonas);

  tablaReservas.appendChild(fila);

  formReserva.reset();
  btnReserva.disabled = true;

  mensajeConfirmacion.textContent = "Reserva agregada correctamente.";

  actualizarResumen();
}

// Esta función actualiza el resumen con los datos de todas las reservas.
function actualizarResumen() {
  const totalReservas = document.getElementById("totalReservas");
  const totalPersonas = document.getElementById("totalPersonas");
  const mayorReserva = document.getElementById("mayorReserva");

  let sumaPersonas = 0;
  let reservaMayor = null;

  reservas.forEach(function (reserva) {
    sumaPersonas += reserva.personas;

    if (reservaMayor === null || reserva.personas > reservaMayor.personas) {
      reservaMayor = reserva;
    }
  });

  totalReservas.textContent = reservas.length;
  totalPersonas.textContent = sumaPersonas;

  if (reservaMayor !== null) {
    mayorReserva.textContent = `${reservaMayor.nombre} (${reservaMayor.personas})`;
  } else {
    mayorReserva.textContent = "Ninguna";
  }
}


document.addEventListener('DOMContentLoaded', function () {
  renderMenu();
  actualizarResumen();

  document.getElementById("nombre").addEventListener("input", validarFormulario);
  document.getElementById("correo").addEventListener("input", validarFormulario);
  document.getElementById("fecha").addEventListener("input", validarFormulario);
  document.getElementById("personas").addEventListener("input", validarFormulario);
});


document.getElementById('form-reserva').addEventListener('submit', function (e) {
  e.preventDefault();

  if (validarFormulario()) {
    agregarReserva();
  }
});
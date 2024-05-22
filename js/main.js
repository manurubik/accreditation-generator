document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Formulario enviado, procesando...");

  const alto = document.getElementById("alto").value;
  const ancho = document.getElementById("ancho").value;
  const imagen = document.getElementById("imagen").files[0];
  const csvFile = document.getElementById("csv").files[0];
  const fuente = document.getElementById("fuente").value; // Obtener la fuente

  if (imagen && csvFile && fuente) {
    console.log("Imagen, archivo CSV y fuente seleccionados.");
    const reader = new FileReader();
    reader.onload = function (event) {
      const imagenURL = event.target.result;
      Papa.parse(csvFile, {
        header: true,
        complete: function (results) {
          console.log("CSV procesado, generando acreditaciones...");
          const data = results.data;
          generarAcreditaciones(data, imagenURL, ancho, alto, fuente); // Pasar la fuente a la función generarAcreditaciones
        },
      });
    };
    reader.readAsDataURL(imagen);
  } else {
    console.error("Falta la imagen, el archivo CSV o la fuente.");
  }
});

// Función para obtener el rol del participante
function obtenerRol(row) {
  let rol = "";

  if (row["WCA ID"]) {
    rol = row["Email"].endsWith("@worldcubeassociation.com")
      ? "Delegado"
      : row["Gender"] === "m"
      ? "Competidor"
      : "Competidora";
  } else {
    rol = row["Gender"] === "m" ? "Nuevo competidor" : "Nueva competidora";
  }

  return rol;
}

// Función para actualizar la vista previa
function actualizarVistaPrevia() {
  const alto = document.getElementById("alto").value;
  const ancho = document.getElementById("ancho").value;
  const imagenFile = document.getElementById("imagen").files[0];
  const fuenteFile = document.getElementById("fuente").files[0]; // Obtener el archivo de fuente

  if (ancho || alto) {
    const vistaPreviaContainer = document.getElementById(
      "vista-previa-container"
    );
    vistaPreviaContainer.style.width = `${ancho}cm`;
    vistaPreviaContainer.style.height = `${alto}cm`;
  }

  if (imagenFile) {
    const imagenReader = new FileReader();
    imagenReader.onload = function (event) {
      const vistaPrevia = document.getElementById("vista-previa");
      const imagenURL = event.target.result;
      vistaPrevia.style.backgroundImage = `url('${imagenURL}')`;
      vistaPrevia.style.backgroundSize = "cover";
      vistaPrevia.style.backgroundPosition = "center";
    };
    imagenReader.readAsDataURL(imagenFile);
  } else {
    const vistaPrevia = document.getElementById("vista-previa");
    vistaPrevia.style.backgroundImage = "none";
  }

  // Solo cargar la fuente una vez al inicio
  if (fuenteFile) {
    const fuenteReader = new FileReader();
    fuenteReader.onload = function (event) {
      const fuenteURL = event.target.result;

      // Crear un nuevo @font-face con la fuente cargada
      const style = document.createElement("style");
      style.appendChild(
        document.createTextNode(`
          @font-face {
              font-family: CustomFont;
              src: url('${fuenteURL}');
          }
          .draggable {
              font-family: CustomFont, sans-serif;
          }
      `)
      );
      document.head.appendChild(style);
    };
    fuenteReader.readAsDataURL(fuenteFile);
  } else {
    eliminarFuente();
  }
  // Evento change para el input de patrocinadores
  document
    .getElementById("patrocinadores")
    .addEventListener("change", function () {
      const files = this.files;
      const vistaPrevia = document.getElementById("vista-previa");

      for (const file of files) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const img = document.createElement("img");
          img.src = event.target.result;
          img.className = "draggable patrocinador";
          img.draggable = true;
          img.style.position = "absolute";
          img.style.maxWidth = "100px";
          img.style.maxHeight = "100px";
          vistaPrevia.appendChild(img);

          interact(img).draggable({
            inertia: true,
            modifiers: [
              interact.modifiers.restrictRect({
                restriction: "parent",
                endOnly: true,
              }),
            ],
            autoScroll: true,
            listeners: { move: dragMoveListener },
          });
          // Agregar evento de doble clic para eliminar el elemento
          img.addEventListener("dblclick", function () {
            img.remove();
          });
        };
        reader.readAsDataURL(file);
      }
    });

  // Implementa la lógica para hacer las imágenes draggable dentro de la vista previa
  // Puedes utilizar la misma lógica que implementaste para los elementos de nombre y rol

  // Hacer los elementos draggable con Interact.js
  interact(".draggable")
    .draggable({
      listeners: { move: dragMoveListener },
      inertia: false,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
    })
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true },

      listeners: { move: resizeListener },
      inertia: false,
      modifiers: [
        interact.modifiers.restrictEdges({
          outer: "parent",
        }),
        interact.modifiers.restrictSize({
          min: { width: 50, height: 50 },
        }),
      ],
    });

  function resizeListener(event) {
    var target = event.target;
    var x = parseFloat(target.getAttribute("data-x")) || 0;
    var y = parseFloat(target.getAttribute("data-y")) || 0;

    // update the element's style
    target.style.width = event.rect.width + "px";
    target.style.height = event.rect.height + "px";

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.transform = "translate(" + x + "px," + y + "px)";

    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }
  function dragMoveListener(event) {
    const target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.transform = `translate(${x}px, ${y}px)`;

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }

  // Agregar evento de doble clic para eliminar los elementos de texto
  const textoNombre = document.getElementById("texto-nombre");
  const textoRol = document.getElementById("texto-rol");
  const sponsor = document.getElementById("sponsor");

  textoNombre.addEventListener("dblclick", function () {
    textoNombre.remove();
  });

  textoRol.addEventListener("dblclick", function () {
    textoRol.remove();
  });
}

window.onload = function () {
  actualizarVistaPrevia();
};

const inputs = document.querySelectorAll(
  'input[type="number"], input[type="file"]'
);
inputs.forEach((input) => {
  input.addEventListener("change", actualizarVistaPrevia);
});

// Obtener los elementos de los controles
const nombreIncreaseBtn = document.getElementById("nombre-increase");
const nombreDecreaseBtn = document.getElementById("nombre-decrease");
const rolIncreaseBtn = document.getElementById("rol-increase");
const rolDecreaseBtn = document.getElementById("rol-decrease");

// Evento click para el botón de aumentar tamaño del nombre
nombreIncreaseBtn.addEventListener("click", function () {
  aumentarTamaño("texto-nombre");
});

// Evento click para el botón de disminuir tamaño del nombre
nombreDecreaseBtn.addEventListener("click", function () {
  disminuirTamaño("texto-nombre");
});

// Evento click para el botón de aumentar tamaño del rol
rolIncreaseBtn.addEventListener("click", function () {
  aumentarTamaño("texto-rol");
});

// Evento click para el botón de disminuir tamaño del rol
rolDecreaseBtn.addEventListener("click", function () {
  disminuirTamaño("texto-rol");
});

// Función para aumentar el tamaño de un elemento
function aumentarTamaño(idElemento) {
  const elemento = document.getElementById(idElemento);
  let fontSize = parseInt(window.getComputedStyle(elemento).fontSize);
  fontSize += 1; // Aumentar el tamaño en 1px
  elemento.style.fontSize = `${fontSize}px`;
}

// Función para disminuir el tamaño de un elemento
function disminuirTamaño(idElemento) {
  const elemento = document.getElementById(idElemento);
  let fontSize = parseInt(window.getComputedStyle(elemento).fontSize);
  fontSize -= 1; // Disminuir el tamaño en 1px
  elemento.style.fontSize = `${fontSize}px`;
}

// Mostrar el botón de eliminar al seleccionar un archivo
document.getElementById("imagen").addEventListener("change", function () {
  const eliminarBoton = document.getElementById("eliminar-imagen");
  eliminarBoton.style.display = this.files.length ? "inline-block" : "none";
});

document.getElementById("csv").addEventListener("change", function () {
  const eliminarBoton = document.getElementById("eliminar-csv");
  eliminarBoton.style.display = this.files.length ? "inline-block" : "none";
});

document.getElementById("fuente").addEventListener("change", function () {
  const eliminarBoton = document.getElementById("eliminar-fuente");
  eliminarBoton.style.display = this.files.length ? "inline-block" : "none";
});

document
  .getElementById("patrocinadores")
  .addEventListener("change", function () {
    const eliminarBoton = document.getElementById("eliminar-patrocinadores");
    eliminarBoton.style.display = this.files.length ? "inline-block" : "none";
  });

// Agregar funcionalidad para eliminar el archivo seleccionado
document
  .getElementById("eliminar-imagen")
  .addEventListener("click", function () {
    const input = document.getElementById("imagen");
    input.value = ""; // Limpiar el valor del input
    this.style.display = "none"; // Ocultar el botón de eliminar
    actualizarVistaPrevia(); // Actualizar la vista previa
  });

document.getElementById("eliminar-csv").addEventListener("click", function () {
  const input = document.getElementById("csv");
  input.value = ""; // Limpiar el valor del input
  this.style.display = "none"; // Ocultar el botón de eliminar
  actualizarVistaPrevia(); // Actualizar la vista previa
});

document
  .getElementById("eliminar-fuente")
  .addEventListener("click", function () {
    const input = document.getElementById("fuente");
    input.value = ""; // Limpiar el valor del input
    this.style.display = "none"; // Ocultar el botón de eliminar
    eliminarFuente();
    actualizarVistaPrevia(); // Actualizar la vista previa
  });

document
  .getElementById("eliminar-patrocinadores")
  .addEventListener("click", function () {
    const input = document.getElementById("patrocinadores");
    input.value = ""; // Limpiar el valor del input
    this.style.display = "none"; // Ocultar el botón de eliminar
    eliminarPatrocinadores();
    actualizarVistaPrevia(); // Actualizar la vista previa
  });

// Función para eliminar la fuente de la vista previa
function eliminarFuente() {
  const styleElements = document.getElementsByTagName("style");
  for (let i = 0; i < styleElements.length; i++) {
    const style = styleElements[i];
    const cssText = style.textContent || style.innerText;
    if (cssText.includes("@font-face")) {
      style.parentNode.removeChild(style);
    }
  }
}
// Función para eliminar los patrocinadores de la vista previa
function eliminarPatrocinadores() {
  const vistaPrevia = document.getElementById("vista-previa");
  const patrocinadores = vistaPrevia.querySelectorAll(".patrocinador");
  patrocinadores.forEach((patrocinador) => {
    patrocinador.remove(); // Eliminar cada patrocinador
  });
}

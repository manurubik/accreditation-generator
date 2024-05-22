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

function generarAcreditaciones(data, imagenURL, ancho, alto) {
  const acreditacionesContainer = document.createElement("div");
  acreditacionesContainer.style.display = "none";
  document.body.appendChild(acreditacionesContainer);

  data.forEach((row, index) => {
    const nombre = row["Name"];
    const rol = obtenerRol(row);

    const acreditacion = document.createElement("div");
    acreditacion.className = "acreditacion";
    acreditacion.style.width = `${ancho}cm`;
    acreditacion.style.height = `${alto}cm`;
    acreditacion.style.backgroundImage = `url('${imagenURL}')`;
    acreditacion.style.backgroundSize = "cover";
    acreditacion.style.backgroundPosition = "center";

    const nombreElem = document.createElement("div");
    nombreElem.className = "nombre";
    nombreElem.textContent = nombre;
    nombreElem.style.position = "absolute";
    nombreElem.style.top = document.getElementById("texto-nombre").style.top;
    nombreElem.style.left = document.getElementById("texto-nombre").style.left;
    nombreElem.style.transform = "translate(-50%, -50%)";

    const rolElem = document.createElement("div");
    rolElem.className = "rol";
    rolElem.textContent = rol;
    rolElem.style.position = "absolute";
    rolElem.style.top = document.getElementById("texto-rol").style.top;
    rolElem.style.left = document.getElementById("texto-rol").style.left;
    rolElem.style.transform = "translate(-50%, -50%)";

    acreditacion.appendChild(nombreElem);
    acreditacion.appendChild(rolElem);
    acreditacionesContainer.appendChild(acreditacion);

    const dpi = window.devicePixelRatio * 96;

    const anchoEnPx = Math.round((ancho * dpi) / 2.54);
    const altoEnPx = Math.round((alto * dpi) / 2.54);

    html2canvas(acreditacion, { width: anchoEnPx, height: altoEnPx })
      .then((canvas) => {
        const image = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = image;
        link.download = `acreditacion_${index}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log(`Acreditación generada para ${nombre}`);
      })
      .catch((error) => {
        console.error("Error al generar la imagen de la acreditación:", error);
      });
  });

  document.body.removeChild(acreditacionesContainer);
  console.log("Todas las acreditaciones han sido procesadas.");
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
      const imagenURL = event.target.result;
      const vistaPrevia = document.getElementById("vista-previa");
      vistaPrevia.style.backgroundImage = `url('${imagenURL}')`;
      vistaPrevia.style.backgroundSize = "cover";
      vistaPrevia.style.backgroundPosition = "center";
    };
    imagenReader.readAsDataURL(imagenFile);
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
  }
  // Obtener el input de patrocinadores
  const patrocinadoresInput = document.getElementById("patrocinadores");

  // Evento change para el input de patrocinadores
  patrocinadoresInput.addEventListener("change", function () {
    // Obtener la lista de archivos seleccionados
    const files = patrocinadoresInput.files;

    // Iterar sobre cada archivo y crear un objeto de imagen draggable para cada uno
    for (const file of files) {
      // Crear un objeto de imagen
      const imagen = new Image();
      imagen.src = URL.createObjectURL(file);
      imagen.className = "draggable sponsor";
      imagen.draggable = true;

      // Añadir la imagen a la vista previa
      document.getElementById("vista-previa").appendChild(imagen);
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

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;
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

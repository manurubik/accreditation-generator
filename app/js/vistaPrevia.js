import { eliminarFuente } from "./utils.js";
// Función para actualizar la vista previa
export function actualizarVistaPrevia() {
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
          // Agregar evento de doble clic para eliminar el elemento
          img.addEventListener("dblclick", function () {
            img.remove();
          });
        };
        reader.readAsDataURL(file);
      }
    });
}

// Hacer los elementos draggable con Interact.js
class DraggingElement {
  constructor(el) {
    this.el = el;
    this.x = 0;
    this.y = 0;
    this.interactElement = interact(this.el);
    this.interactElement.draggable({
      listeners: {
        move: dragMoveListener,
      },
      inertia: false,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
    });
    this.interactElement.resizable({
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
  }
}

let de1 = new DraggingElement(".draggable");
let de2 = new DraggingElement(".patrocinador");

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

export function eventosDraggables() {
  // Agregar evento de doble clic para eliminar los elementos de texto
  const textoNombre = document.getElementById("texto-nombre");
  const textoRol = document.getElementById("texto-rol");
  const rolIncreaseBtn = document.getElementById("rol-increase");
  const rolDecreaseBtn = document.getElementById("rol-decrease");
  const restaurarRol = document.getElementById("restaurar-rol");

  textoNombre.addEventListener("dblclick", function () {
    alert("¡No puedes eliminar el nombre del competidor!");
  });

  textoRol.addEventListener("dblclick", function () {
    textoRol.remove();
    rolIncreaseBtn.style.display = "none";
    rolDecreaseBtn.style.display = "none";
    restaurarRol.style.display = "inline-block";
  });

  restaurarRol.addEventListener("click", function (e) {
    e.preventDefault();
    const vistaPrevia = document.getElementById("vista-previa");
    // Crear un nuevo elemento #texto-rol
    const nuevoTextoRol = document.createElement("div");
    nuevoTextoRol.id = "texto-rol";
    nuevoTextoRol.classList.add("draggable");
    nuevoTextoRol.draggable = true;
    nuevoTextoRol.textContent = "Competidor";

    // Añadir evento de doble clic al nuevo elemento
    nuevoTextoRol.addEventListener("dblclick", function () {
      nuevoTextoRol.remove();
      rolIncreaseBtn.style.display = "none";
      rolDecreaseBtn.style.display = "none";
      restaurarRol.style.display = "inline-block";
    });

    // Añadir el nuevo elemento a la vista previa
    vistaPrevia.appendChild(nuevoTextoRol);

    // Mostrar los botones de control de tamaño
    rolIncreaseBtn.style.display = "inline";
    rolDecreaseBtn.style.display = "inline";
    restaurarRol.style.display = "none";
  });
}

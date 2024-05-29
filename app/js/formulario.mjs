import {
  eliminarFuente,
  eliminarPatrocinadores,
  aumentarTamaño,
  disminuirTamaño,
} from "./utils.mjs";
import { actualizarVistaPrevia } from "./vistaPrevia.mjs";

export function eventosFormulario() {
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
    .addEventListener("click", function (e) {
      e.preventDefault();
      const input = document.getElementById("imagen");
      input.value = ""; // Limpiar el valor del input
      this.style.display = "none"; // Ocultar el botón de eliminar
      actualizarVistaPrevia(); // Actualizar la vista previa
    });

  document
    .getElementById("eliminar-csv")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const input = document.getElementById("csv");
      input.value = ""; // Limpiar el valor del input
      this.style.display = "none"; // Ocultar el botón de eliminar
      actualizarVistaPrevia(); // Actualizar la vista previa
    });

  document
    .getElementById("eliminar-fuente")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const input = document.getElementById("fuente");
      input.value = ""; // Limpiar el valor del input
      this.style.display = "none"; // Ocultar el botón de eliminar
      eliminarFuente();
      actualizarVistaPrevia(); // Actualizar la vista previa
    });

  document
    .getElementById("eliminar-patrocinadores")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const input = document.getElementById("patrocinadores");
      input.value = ""; // Limpiar el valor del input
      this.style.display = "none"; // Ocultar el botón de eliminar
      eliminarPatrocinadores();
      actualizarVistaPrevia(); // Actualizar la vista previa
    });

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", actualizarVistaPrevia);
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });
  });

  const elementos = ["nombre", "rol", "titulo"];
  const funciones = ["increase", "decrease"];

  elementos.forEach((el) => {
    funciones.forEach((fn) => {
      document.getElementById(`${el}-${fn}`).addEventListener("click", (e) => {
        e.preventDefault();
        if (fn === "increase") {
          aumentarTamaño(`texto-${el}`);
        } else {
          disminuirTamaño(`texto-${el}`);
        }
      });
    });
  });

  const añadirNombre = document.getElementById("añadirNombreOpen");
  let nombreCampeonato = "";
  const nombreOpenInput = document.getElementById("nombreOpen");
  let titulo = document.getElementById("titulo");

  nombreOpenInput.addEventListener("input", function () {
    nombreCampeonato = nombreOpenInput.value.trim();
    titulo.innerHTML = nombreCampeonato
      ? `Generador de Acreditaciones para el ${nombreCampeonato}`
      : "Generador de Acreditaciones para Campeonatos";
    añadirNombre.style.display = nombreCampeonato ? "inline-block" : "none";
  });

  añadirNombre.addEventListener("click", function (e) {
    e.preventDefault();
    // Crear un nuevo elemento .draggable
    const nuevoTitulo = document.getElementById("texto-titulo");
    const controlTitulo = document.getElementById("controlTitulo");

    nuevoTitulo.style.display = "flex";
    nuevoTitulo.textContent = nombreCampeonato;

    // Añadir evento de doble clic al nuevo elemento
    nuevoTitulo.addEventListener("dblclick", function () {
      nuevoTitulo.style.display = "none";
      controlTitulo.style.display = "none";
      añadirNombre.style.display = "inline-block";
    });

    controlTitulo.style.display = "flex";
    añadirNombre.style.display = "none";
  });
}

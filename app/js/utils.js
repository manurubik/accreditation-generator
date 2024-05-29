// Función para obtener el rol del participante
export function obtenerRol(row) {
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

// Función para aumentar el tamaño de un elemento
export function aumentarTamaño(idElemento) {
  const elemento = document.getElementById(idElemento);
  let fontSize = parseInt(window.getComputedStyle(elemento).fontSize);
  fontSize += 1; // Aumentar el tamaño en 1px
  elemento.style.fontSize = `${fontSize}px`;
}

// Función para disminuir el tamaño de un elemento
export function disminuirTamaño(idElemento) {
  const elemento = document.getElementById(idElemento);
  let fontSize = parseInt(window.getComputedStyle(elemento).fontSize);
  fontSize -= 1; // Disminuir el tamaño en 1px
  elemento.style.fontSize = `${fontSize}px`;
}

// Función para eliminar la fuente de la vista previa
export function eliminarFuente() {
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
export function eliminarPatrocinadores() {
  const vistaPrevia = document.getElementById("vista-previa");
  const patrocinadores = vistaPrevia.querySelectorAll(".patrocinador");
  patrocinadores.forEach((patrocinador) => {
    patrocinador.remove(); // Eliminar cada patrocinador
  });
}

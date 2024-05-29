!function e(t,n,i){function r(o,l){if(!n[o]){if(!t[o]){var c="function"==typeof require&&require;if(!l&&c)return c(o,!0);if(a)return a(o,!0);var d=new Error("Cannot find module '"+o+"'");throw d.code="MODULE_NOT_FOUND",d}var s=n[o]={exports:{}};t[o][0].call(s.exports,(function(e){return r(t[o][1][e]||e)}),s,s.exports,e,t,n,i)}return n[o].exports}for(var a="function"==typeof require&&require,o=0;o<i.length;o++)r(i[o]);return r}({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.eventosFormulario=function(){document.getElementById("imagen").addEventListener("change",(function(){document.getElementById("eliminar-imagen").style.display=this.files.length?"inline-block":"none"})),document.getElementById("csv").addEventListener("change",(function(){document.getElementById("eliminar-csv").style.display=this.files.length?"inline-block":"none"})),document.getElementById("fuente").addEventListener("change",(function(){document.getElementById("eliminar-fuente").style.display=this.files.length?"inline-block":"none"})),document.getElementById("patrocinadores").addEventListener("change",(function(){document.getElementById("eliminar-patrocinadores").style.display=this.files.length?"inline-block":"none"})),document.getElementById("eliminar-imagen").addEventListener("click",(function(e){e.preventDefault(),document.getElementById("imagen").value="",this.style.display="none",(0,r.actualizarVistaPrevia)()})),document.getElementById("eliminar-csv").addEventListener("click",(function(e){e.preventDefault(),document.getElementById("csv").value="",this.style.display="none",(0,r.actualizarVistaPrevia)()})),document.getElementById("eliminar-fuente").addEventListener("click",(function(e){e.preventDefault(),document.getElementById("fuente").value="",this.style.display="none",(0,i.eliminarFuente)(),(0,r.actualizarVistaPrevia)()})),document.getElementById("eliminar-patrocinadores").addEventListener("click",(function(e){e.preventDefault(),document.getElementById("patrocinadores").value="",this.style.display="none",(0,i.eliminarPatrocinadores)(),(0,r.actualizarVistaPrevia)()})),document.querySelectorAll("input").forEach((function(e){e.addEventListener("input",r.actualizarVistaPrevia),e.addEventListener("keydown",(function(e){"Enter"===e.key&&e.preventDefault()}))}));var e=["increase","decrease"];["nombre","rol","titulo"].forEach((function(t){e.forEach((function(e){document.getElementById("".concat(t,"-").concat(e)).addEventListener("click",(function(n){n.preventDefault(),"increase"===e?(0,i.aumentarTamaño)("texto-".concat(t)):(0,i.disminuirTamaño)("texto-".concat(t))}))}))}));var t=document.getElementById("añadirNombreOpen"),n="",a=document.getElementById("nombreOpen"),o=document.getElementById("titulo");a.addEventListener("input",(function(){n=a.value.trim(),o.innerHTML=n?"Generador de Acreditaciones para el ".concat(n):"Generador de Acreditaciones para Campeonatos",t.style.display=n?"inline-block":"none"})),t.addEventListener("click",(function(e){e.preventDefault();var i=document.getElementById("texto-titulo"),r=document.getElementById("controlTitulo");i.style.display="flex",i.textContent=n,i.addEventListener("dblclick",(function(){i.style.display="none",r.style.display="none",t.style.display="inline-block"})),r.style.display="flex",t.style.display="none"}))};var i=e("./utils.js"),r=e("./vistaPrevia.js")},{"./utils.js":3,"./vistaPrevia.js":4}],2:[function(e,t,n){"use strict";var i=e("./formulario.js"),r=e("./vistaPrevia.js");document.addEventListener("DOMContentLoaded",(function(){(0,i.eventosFormulario)(),(0,r.eventosDraggables)()}))},{"./formulario.js":1,"./vistaPrevia.js":4}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.aumentarTamaño=function(e){var t=document.getElementById(e),n=parseInt(window.getComputedStyle(t).fontSize);n+=1,t.style.fontSize="".concat(n,"px")},n.disminuirTamaño=function(e){var t=document.getElementById(e),n=parseInt(window.getComputedStyle(t).fontSize);n-=1,t.style.fontSize="".concat(n,"px")},n.eliminarFuente=function(){for(var e=document.getElementsByTagName("style"),t=0;t<e.length;t++){var n=e[t];(n.textContent||n.innerText).includes("@font-face")&&n.parentNode.removeChild(n)}},n.eliminarPatrocinadores=function(){document.getElementById("vista-previa").querySelectorAll(".patrocinador").forEach((function(e){e.remove()}))},n.obtenerRol=function(e){var t="";t=e["WCA ID"]?e.Email.endsWith("@worldcubeassociation.com")?"Delegado":"m"===e.Gender?"Competidor":"Competidora":"m"===e.Gender?"Nuevo competidor":"Nueva competidora";return t}},{}],4:[function(e,t,n){"use strict";function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}Object.defineProperty(n,"__esModule",{value:!0}),n.actualizarVistaPrevia=function(){var e=document.getElementById("alto").value,t=document.getElementById("ancho").value,n=document.getElementById("imagen").files[0],i=document.getElementById("fuente").files[0];if(t||e){var a=document.getElementById("vista-previa-container");a.style.width="".concat(t,"cm"),a.style.height="".concat(e,"cm")}if(n){var o=new FileReader;o.onload=function(e){var t=document.getElementById("vista-previa"),n=e.target.result;t.style.backgroundImage="url('".concat(n,"')"),t.style.backgroundSize="cover",t.style.backgroundPosition="center"},o.readAsDataURL(n)}else{document.getElementById("vista-previa").style.backgroundImage="none"}if(i){var l=new FileReader;l.onload=function(e){var t=e.target.result,n=document.createElement("style");n.appendChild(document.createTextNode("\n          @font-face {\n              font-family: CustomFont;\n              src: url('".concat(t,"');\n          }\n          .draggable {\n              font-family: CustomFont, sans-serif;\n          }\n      "))),document.head.appendChild(n)},l.readAsDataURL(i)}else(0,r.eliminarFuente)();document.getElementById("patrocinadores").addEventListener("change",(function(){var e,t=this.files,n=document.getElementById("vista-previa"),i=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return c(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){l=!0,a=e},f:function(){try{o||null==n.return||n.return()}finally{if(l)throw a}}}}(t);try{for(i.s();!(e=i.n()).done;){var r=e.value,a=new FileReader;a.onload=function(e){var t=document.createElement("img");t.src=e.target.result,t.className="draggable patrocinador",t.draggable=!0,t.style.position="absolute",t.style.maxWidth="100px",t.style.maxHeight="100px",n.appendChild(t),t.addEventListener("dblclick",(function(){t.remove()}))},a.readAsDataURL(r)}}catch(e){i.e(e)}finally{i.f()}}))},n.eventosDraggables=function(){var e=document.getElementById("texto-nombre"),t=document.getElementById("texto-rol"),n=document.getElementById("rol-increase"),i=document.getElementById("rol-decrease"),r=document.getElementById("restaurar-rol");e.addEventListener("dblclick",(function(){alert("¡No puedes eliminar el nombre del competidor!")})),t.addEventListener("dblclick",(function(){t.remove(),n.style.display="none",i.style.display="none",r.style.display="inline-block"})),r.addEventListener("click",(function(e){e.preventDefault();var t=document.getElementById("vista-previa"),a=document.createElement("div");a.id="texto-rol",a.classList.add("draggable"),a.draggable=!0,a.textContent="Competidor",a.addEventListener("dblclick",(function(){a.remove(),n.style.display="none",i.style.display="none",r.style.display="inline-block"})),t.appendChild(a),n.style.display="inline",i.style.display="inline",r.style.display="none"}))};var r=e("./utils.js");function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,l(i.key),i)}}function o(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function l(e){var t=function(e,t){if("object"!=i(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=i(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==i(t)?t:t+""}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=Array(t);n<t;n++)i[n]=e[n];return i}var d=o((function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.el=t,this.x=0,this.y=0,this.interactElement=interact(this.el),this.interactElement.draggable({listeners:{move:s},inertia:!1,modifiers:[interact.modifiers.restrictRect({restriction:"parent",endOnly:!0})]}),this.interactElement.resizable({edges:{left:!0,right:!0,bottom:!0,top:!0},listeners:{move:u},inertia:!1,modifiers:[interact.modifiers.restrictEdges({outer:"parent"}),interact.modifiers.restrictSize({min:{width:50,height:50}})]})}));new d(".draggable"),new d(".patrocinador");function s(e){var t=e.target,n=(parseFloat(t.getAttribute("data-x"))||0)+e.dx,i=(parseFloat(t.getAttribute("data-y"))||0)+e.dy;t.style.transform="translate(".concat(n,"px, ").concat(i,"px)"),t.setAttribute("data-x",n),t.setAttribute("data-y",i)}function u(e){var t=e.target,n=parseFloat(t.getAttribute("data-x"))||0,i=parseFloat(t.getAttribute("data-y"))||0;t.style.width=e.rect.width+"px",t.style.height=e.rect.height+"px",n+=e.deltaRect.left,i+=e.deltaRect.top,t.style.transform="translate("+n+"px,"+i+"px)",t.setAttribute("data-x",n),t.setAttribute("data-y",i)}},{"./utils.js":3}]},{},[4,3,2,1]);
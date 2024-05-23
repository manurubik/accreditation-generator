# Generador de Acreditaciones para Campeonatos

Este proyecto es una aplicación web que permite generar acreditaciones personalizadas para campeonatos. Los usuarios pueden configurar el tamaño de las acreditaciones, subir imágenes de fondo, cargar datos desde un archivo CSV y personalizar el diseño.

## Características

- Configuración de tamaño de las acreditaciones.
- Carga de imagen de fondo.
- Carga de archivo CSV para datos de acreditaciones.
- Opción para cargar fuentes personalizadas.
- Subida de imágenes de patrocinadores opcional.
- Vista previa interactiva y editable.
- Exportación de acreditaciones como imágenes.
- Diseño responsivo.

## Requisitos

- Node.js
- npm

## Tecnologías Utilizadas

- HTML
- CSS
- SCSS
- JavaScript
- [Gulp](https://gulpjs.com/) para la transformación de SCSS y JS, y servidor de desarrollo.
- [PapaParse](https://www.papaparse.com/) para la manipulación de archivos CSV.
- [html2canvas](https://html2canvas.hertzen.com/) para la generación de capturas de pantalla.
- [interact.js](https://interactjs.io/) para la interactividad de los elementos.

## Estructura del Proyecto

```txt
generador-acreditaciones/
├── app/
│ └── js/
│   └── main.js
│ └── scss/
│   └── _formulario.scss
│   └── _mobile.scss
│   └── _reset.scss
│   └── _vistaPrevia.scss
│   └── styles.scss
├── dist/
│ └── css/
│   └── styles.css
│   └── styles.css.map
│ └── js/
│   └── main.js
├── node_modules
├── .gitignore
├── gulpfile.js
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/manurubik/accreditation-generator.git
   ```

2. Navega al directorio del proyecto

   ```bash
   cd accreditation-generator
   ```

3. Instala las dependencias

   ```bash
   npm install
   ```

## Uso

1. Inicia Gulp

   ```bash
   npm start
   ```

2. Abre el archivo index.html en tu navegador web (puede que se abra automáticamente).
3. Rellena los campos del formulario:
   - Introduce el alto y el ancho de la acreditación (en cm).
   - Sube una imagen de fondo.
   - Sube un archivo CSV con los datos (se obtiene como organizador en la web de la WCA).
   - Opcionalmente, sube una fuente personalizada y/o imágenes de patrocinadores.
4. Usa la vista previa para ajustar el diseño de las acreditaciones.
5. Haz clic en "Generar Acreditaciones" para crear las acreditaciones.

## Estilos Responsivos

El diseño es responsivo y se ajusta a dispositivos móviles. A pesar de ello, puede que la librería _interact.js_ no funcione correctamente.

## Contribución

Las contribuciones son bienvenidas. Si deseas contribuir, por favor, realiza un fork del repositorio y crea una pull request con tus cambios.

## Licencia

Este proyecto está licenciado bajo la Licencia Pública General de GNU, versión 3 (GPL-3.0). Para más detalles, consulta el archivo LICENSE

Este archivo `README.md` incluye ahora la licencia GPL-3.0, proporcionando una visión general del proyecto, instrucciones de instalación, uso y otra información relevante para cualquier desarrollador o usuario interesado en utilizar o contribuir al proyecto.

# 🏅 Generador de Acreditaciones para Campeonatos

Este proyecto es una aplicación web que permite generar acreditaciones personalizadas para campeonatos. Los usuarios pueden configurar el tamaño de las acreditaciones, subir imágenes de fondo, cargar datos desde un archivo CSV y personalizar el diseño.

## ✨ Características

- 📏 Configuración de tamaño de las acreditaciones.
- 🖼️ Carga de imagen de fondo.
- 📂 Carga de archivo CSV para datos de acreditaciones.
- 🖋️ Opción para cargar fuentes personalizadas.
- 🤝 Subida de imágenes de patrocinadores opcional.
- 👁️ Vista previa interactiva y editable.
- 🖨️ Exportación de acreditaciones como imágenes.
- 📱 Diseño responsivo.

## 🛠️ Tecnologías Utilizadas

- ![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
- ![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
- ![Gulp](https://img.shields.io/badge/Gulp-CF4647?style=for-the-badge&logo=gulp&logoColor=white)
- TODO: GENERADOR DE ACREDITACIONES

## 🗂️ Estructura del Proyecto

```txt
generador-acreditaciones/
├── app/
│   ├── js/
│   │   └── formulario.js
│   │   └── main.js
│   │   └── utils.js
│   │   └── vistaPrevia.js
|   ├── scss/
│   │   └── _formulario.css
│   │   └── _generales.css
│   │   └── _mobile.css
│   │   └── _reset.css
│   │   └── _vistaPrevia.css
│   │   └── styles.css
├── dist/
|   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── scripts.js
├── .gitignore
├── LICENSE
├── README.md
├── gulpfile.js
├── index.html
├── package-lock.json
└── package.json
```

## 💻 Uso

1. Visita la web del proyecto en [GitHub Pages](https://manurubik.github.io/accreditation-generator)
2. Rellena los campos del formulario:
   - Introduce el alto y el ancho de la acreditación (en cm).
   - Sube una imagen de fondo.
   - Sube un archivo CSV con los datos (se obtiene como organizador en la web de la WCA).
   - Opcionalmente, sube una fuente personalizada y/o imágenes de patrocinadores.
3. Usa la vista previa para ajustar el diseño de las acreditaciones.
4. (TODO) Haz clic en "Generar Acreditaciones" para crear las acreditaciones.

## 📱 Estilos Responsivos

El diseño es responsivo y se ajusta a dispositivos móviles. A pesar de ello, puede que la librería _"interact.js"_ no funcione correctamente.

## 🤝 Contribución

Las contribuciones son bienvenidas. Si deseas contribuir, por favor, realiza un fork del repositorio y crea una pull request con tus cambios.

## 📜 Licencia

Este proyecto está licenciado bajo la Licencia Pública General de GNU, versión 3 (GPL-3.0). Para más detalles, consulta el archivo LICENSE

Este archivo `README.md` incluye ahora la licencia GPL-3.0, proporcionando una visión general del proyecto, instrucciones de instalación, uso y otra información relevante para cualquier desarrollador o usuario interesado en utilizar o contribuir al proyecto.

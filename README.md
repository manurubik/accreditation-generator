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

- HTML
- CSS
- SCSS
- JavaScript
- [Gulp](https://gulpjs.com/) para la transformación de SCSS y servidor de desarrollo.

## 🗂️ Estructura del Proyecto

```txt
generador-acreditaciones/
├── app/
|   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── scss/
│   │   ├── _formulario.scss
│   │   ├── _mobile.scss
│   │   ├── _reset.scss
│   │   ├── _vistaPrevia.scss
│   │   └── styles.scss
├── node_modules
├── .gitignore
├── gulpfile.js
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

## 💻 Uso

1. Visita mi web de [GitHub Pages](https://manurubik.github.io/accreditation-generator)
2. Rellena los campos del formulario:
   - Introduce el alto y el ancho de la acreditación (en cm).
   - Sube una imagen de fondo.
   - Sube un archivo CSV con los datos (se obtiene como organizador en la web de la WCA).
   - Opcionalmente, sube una fuente personalizada y/o imágenes de patrocinadores.
3. Usa la vista previa para ajustar el diseño de las acreditaciones.
4. Haz clic en "Generar Acreditaciones" para crear las acreditaciones.

## 📱 Estilos Responsivos

El diseño es responsivo y se ajusta a dispositivos móviles. A pesar de ello, puede que la librería _interact.js_ no funcione correctamente.

## 🤝 Contribución

Las contribuciones son bienvenidas. Si deseas contribuir, por favor, realiza un fork del repositorio y crea una pull request con tus cambios.

## 📜 Licencia

Este proyecto está licenciado bajo la Licencia Pública General de GNU, versión 3 (GPL-3.0). Para más detalles, consulta el archivo LICENSE

Este archivo `README.md` incluye ahora la licencia GPL-3.0, proporcionando una visión general del proyecto, instrucciones de instalación, uso y otra información relevante para cualquier desarrollador o usuario interesado en utilizar o contribuir al proyecto.

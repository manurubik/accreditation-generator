const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const browsersync = require("browser-sync").create();

// Rutas de archivos
const paths = {
  styles: {
    src: "app/scss/**/*.scss",
    dest: "app/css/",
  },
  scripts: {
    src: "app/js/**/*.*js",
  },
  html: {
    src: "*.html",
  },
};

// Compilar SCSS
function styles() {
  return src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest(paths.styles.dest))
    .pipe(browsersync.stream());
}

// Transpilar y minificar JavaScript
function scripts() {
  return src(paths.scripts.src).pipe(browsersync.stream());
}

// Iniciar servidor y vigilar cambios
function serve() {
  browsersync.init({
    server: {
      baseDir: "./",
    },
  });

  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.html.src).on("change", browsersync.reload);
}

// Tareas
exports.styles = styles;
exports.scripts = scripts;
exports.serve = serve;
exports.default = series(styles, scripts, serve);

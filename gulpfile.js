const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

// Rutas de archivos
const paths = {
  styles: {
    src: "app/scss/**/*.scss",
    dest: "dist/css/",
  },
  scripts: {
    src: "app/js/**/*.js",
    dest: "dist/js/",
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
  return src(paths.scripts.src)
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(terser())
    .pipe(dest(paths.scripts.dest))
    .pipe(browsersync.stream());
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

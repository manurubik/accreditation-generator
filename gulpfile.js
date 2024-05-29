import { src, dest, watch, series } from "gulp";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import babel from "gulp-babel";
import terser from "gulp-terser";
import concat from "gulp-concat";
import gulpSass from "gulp-sass";
import * as sassCompiler from "sass";
import browserSync from "browser-sync";

import browserify from "browserify";
import babelify from "babelify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import * as glob from "glob";

const sass = gulpSass(sassCompiler);
const browsersync = browserSync.create();

const paths = {
  styles: {
    src: "app/scss/**/*.scss",
    dest: "dist/css/",
    output: "styles.css", // Nombre del archivo CSS combinado
  },
  scripts: {
    src: glob.sync("app/js/*.js"),
    dest: "dist/js/",
    output: "script.js", // Nombre del archivo JS combinado
  },
  html: {
    src: "*.html",
  },
};

// Compilar y combinar SCSS
function styles() {
  return src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(concat(paths.styles.output)) // Unir todos los archivos CSS en uno solo
    .pipe(dest(paths.styles.dest))
    .pipe(browsersync.stream());
}

// Transpilar, minificar y combinar JavaScript
function scripts() {
  return browserify({
    entries: glob.sync("app/js/*.js"), // Aquí se usará directamente glob.sync() para obtener todas las rutas de los archivos JS
    debug: true,
  })
    .transform(babelify, {
      presets: ["@babel/preset-env"],
      sourceMaps: true,
    })
    .bundle()
    .pipe(source(paths.scripts.output))
    .pipe(buffer())
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
export default series(styles, scripts, serve);

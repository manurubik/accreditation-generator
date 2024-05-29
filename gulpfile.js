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

const sass = gulpSass(sassCompiler);
const browsersync = browserSync.create();

const paths = {
  styles: {
    src: "app/scss/**/*.scss",
    dest: "dist/css/",
    output: "styles.css", // Nombre del archivo CSS combinado
  },
  scripts: {
    src: "app/js/**/*.js",
    dest: "dist/js/",
    output: "main.js", // Nombre del archivo JS combinado
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
  return src(paths.scripts.src)
    .pipe(
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              modules: false,
            },
          ],
        ],
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
export default series(styles, scripts, serve);

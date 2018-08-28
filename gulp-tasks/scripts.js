import gulp from 'gulp';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import { argv } from 'yargs';
import config from '../_config/project-config.js';
import uglify from 'gulp-uglify';

const isProd = (argv.prod || false);

function generateScript(source, fileName) {
  return gulp.src(source)
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(concat(fileName))
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest(config.dest + config.scripts));
}

export function vendorScripts() {
  return generateScript(config.vendorScriptFileList, 'vendor.js');
}

export function mainScripts() {
  return generateScript(config.mainScriptFileList, 'main.js');
}

export function serviceWorkerScripts() {
  return generateScript(config.serviceWorkerScriptFileList, 'service-worker.js');
}

export function serviceWorkerRegisterScripts() {
  return generateScript(config.serviceWorkerRegisterScriptFileList, 'service-worker-register.js');
}

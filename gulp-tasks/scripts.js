import gulp from 'gulp';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import { argv } from 'yargs';
import config from '../_config/project-config.js';
import uglify from 'gulp-uglify';

const isProd = (argv.prod || false);

function vendorScripts() {
  return gulp.src(config.vendorScriptFileList)
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(concat('vendor.js'))
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest(config.dest + config.scripts));
}

function mainScripts() {
  return gulp.src(config.mainScriptFileList)
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(concat('main.js'))
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest(config.dest + config.scripts));
}

export { vendorScripts, mainScripts }

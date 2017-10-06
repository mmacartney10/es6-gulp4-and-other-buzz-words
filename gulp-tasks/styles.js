import gulp from 'gulp';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import { argv } from 'yargs';
import config from '../_config/project-config.js';
import sgc from 'gulp-sass-generate-contents';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import pxToRem from 'postcss-pxtorem';

const isProd = (argv.prod || false);

const postcssPlugins = [
  autoprefixer({browsers: ['last 1 version']}),
  pxToRem({
    rootValue: config.basePixel,
    replace: false
  })
];

if (isProd) {
  postcssPlugins.push(cssnano());
}

function sassGenerateContents() {
  return gulp.src(config.stylesSrc)
    .pipe(sgc('main.scss'))
    .pipe(gulp.dest(config.src + config.styles));
}

function styles() {
  return gulp.src(config.src + config.styles + 'main.scss')
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest(config.dest + config.styles))
}

export { sassGenerateContents, styles }

import gulp from 'gulp';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import { argv } from 'yargs';
import config from '../_config/project-config.js';
import stylelintConfig from '../_config/stylelint-config.js';
import sgc from 'gulp-sass-generate-contents';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import pxToRem from 'postcss-pxtorem';
import postcssReporter from 'postcss-reporter';
import stylelint from 'stylelint';
import replace from 'gulp-replace';

const isProd = (argv.prod || false);

const postcssPlugins = [
  autoprefixer({browsers: ['last 3 versions']}),
  pxToRem({rootValue: config.basePixel, replace: false}),
  stylelint(stylelintConfig),
  postcssReporter({clearReportedMessages: true})
];

if (isProd) {
  postcssPlugins.push(cssnano());
}

export function sassGenerateContents() {
  return gulp.src(config.stylesSrc)
    .pipe(sgc('main.scss'))
    .pipe(gulp.dest(config.src + config.styles));
}

export function styles() {
  return gulp.src(config.src + config.styles + 'main.scss')
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest(config.dest + config.styles))
}

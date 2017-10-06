import gulp from 'gulp';
import config from '../_config/project-config.js';
import flatten from 'gulp-flatten';
import gulpCopy from 'gulp-copy';

export function copyFonts() {
  return gulp.src([config.src + config.fonts + '*'])
    .pipe(flatten())
    .pipe(gulp.dest(config.dest + config.fonts));
}

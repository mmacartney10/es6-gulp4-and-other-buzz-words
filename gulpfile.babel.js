import gulp from 'gulp';
import config from './_config/project-config.js';

import { svg, bitmap } from './gulp-tasks/images.js';
import { sassGenerateContents, styles, criticalStyles } from './gulp-tasks/styles.js';
import { vendorScripts, mainScripts } from './gulp-tasks/scripts.js';
import { copyFonts } from './gulp-tasks/copy.js';

export function watch() {
  gulp.watch(config.src + config.styles + '**/*.scss', gulp.series(styles, criticalStyles));
  gulp.watch(config.src + config.views + '**/*.scss', gulp.series(styles, criticalStyles));
  gulp.watch(config.src + config.scripts + '**/*.js', gulp.series(mainScripts, vendorScripts));
}

const build = gulp.series(mainScripts, vendorScripts, svg, bitmap, sassGenerateContents, styles, criticalStyles, copyFonts);

gulp.task('dev', gulp.series(build, watch));
gulp.task('default', build);

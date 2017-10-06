import gulp from 'gulp';
import config from './_config/project-config.js';

import { svg } from './gulp-tasks/images.js';
import { sassGenerateContents, styles } from './gulp-tasks/styles.js';
import { vendorScripts, mainScripts } from './gulp-tasks/scripts.js';
import { copyFonts } from './gulp-tasks/copy.js';

export function watch() {
  gulp.watch(config.src + config.styles + '**/*.scss', styles);
  gulp.watch(config.src + config.views + '**/*.scss', styles);
  gulp.watch(config.src + config.scripts + '**/*.js', gulp.series(mainScripts, vendorScripts));
}

const build = gulp.series(mainScripts, vendorScripts, svg, sassGenerateContents, styles, copyFonts);

gulp.task('dev', build, watch);
gulp.task('default', gulp.series(build));
